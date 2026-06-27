import { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch.ts";
import type { FormValues } from "./types.ts";
import LoadingSpinner from "../../Atoms/LoadingSpinner/LoadingSpinner.tsx";
import ErrorSpan from "../../Atoms/ErrorSpan/ErrorSpan.tsx";
import NumberInput from "../../Atoms/NumberInput/NumberInput.tsx";
import SubmitButton from "../../Atoms/SubmitButton/SubmitButton.tsx";
import { useNavigate } from "react-router-dom";
import InputLabel from "../../Atoms/InputLabel/InputLabel.tsx";
import AddIcon from "../../Atoms/Icons/AddIcon.tsx";
import TertiaryButton from "../../Atoms/TertiaryButton/TertiaryButton.tsx";

const NewGameForm = () => {
  // 1. Hook for fetching existing players
  const { data, loading: playersLoading, error: playersError } = useFetch(import.meta.env.VITE_API_URL + 'players');

  // 2. Local states for the Submission process
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { register, control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      gameName: "",
      buyIn: 0,
      players: [{ name: "", id: "", score: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "players"
  });

  const watchedPlayers = watch("players");

  // Handle clicking outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (formData: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Transform data: Ensure id is null for new players so MySQL can handle the INSERT
    const payload = {
      gameName: formData.gameName,
      buyIn: formData.buyIn,
      players: formData.players.map(p => ({
        id: p.id || null,
        name: p.name,
        score: p.score
      }))
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        // Capture specific backend error messages (e.g., "Database connection failed")
        throw new Error(result.message || 'Failed to save the game');
      }

      // Successful redirect using the ID returned by MySQL
      navigate(`/games/${result.data.id}`);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      ref={containerRef}
      className="flex flex-col gap-2 w-full max-w-md p-4"
    >
      <div className="flex flex-col gap-1">
        <InputLabel label="Game name:" htmlFor="gameName" />
        <input
          {...register("gameName", { required: "Game name is required" })}
          type="text"
          autoComplete="off"
          placeholder="Your game name..."
          className="grow px-4 py-2 bg-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
        />
      </div>

      <NumberInput
        id="buyIn"
        label="Buy in:"
        {...register("buyIn", { valueAsNumber: true, min: 0 })}
        min={0}
        max={1000}
        placeholder="0"
      />

      <span className="border border-white/20 my-2 mx-4"></span>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="relative group">
            <div className="flex gap-2">
              <div className="relative flex flex-col flex-1 gap-1">
                <InputLabel label="Name:" htmlFor={`players.${index}.name`} />
                <input
                  {...register(`players.${index}.name` as const, {
                    required: true,
                    onChange: () => {
                        // If user types, clear ID to mark as "New Player"
                        if (watchedPlayers[index].id) {
                            setValue(`players.${index}.id`, "");
                        }
                    }
                  })}
                  type="text"
                  autoComplete="off"
                  onFocus={() => setActiveDropdown(index)}
                  placeholder="Type player name..."
                  className="grow px-4 py-2 bg-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                />

                {/* Visual state indicator */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none">
                  {watchedPlayers[index].id ? (
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">Existing</span>
                  ) : watchedPlayers[index].name ? (
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">New</span>
                  ) : null}
                </div>

                <input type="hidden" {...register(`players.${index}.id` as const)} />

                {activeDropdown === index && data && (
                  <ul className="absolute z-20 top-full w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto py-1">
                    {data?.data
                      .filter(p =>
                        p.name.toLowerCase().includes(watchedPlayers[index].name.toLowerCase()) &&
                        !watchedPlayers.some((sp, i) => i !== index && sp.id === p.id)
                      )
                      .map((p) => (
                        <li
                          key={p.id}
                          onClick={() => {
                            setValue(`players.${index}.name`, p.name);
                            setValue(`players.${index}.id`, p.id);
                            setActiveDropdown(null);
                          }}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 flex justify-between items-center"
                        >
                          {p.name}
                          <span className="text-xs text-gray-400">Select</span>
                        </li>
                      ))}
                      <li onClick={() => setActiveDropdown(null)} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-xs text-blue-600 border-t italic">
                        + Use "{watchedPlayers[index].name}" as new player
                      </li>
                  </ul>
                )}

                {watchedPlayers[index].name?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setValue(`players.${index}.name`, "");
                      setValue(`players.${index}.id`, "");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 p-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              <NumberInput
                {...register(`players.${index}.score` as const, {
                    required: true,
                    valueAsNumber: true,
                })}
                id={`players.${index}.score`}
                label="Score:"
                placeholder="0"
              />

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-gray-400 hover:text-red-500 text-xl"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 items-center p-4">
        <TertiaryButton
          type="button"
          text="Add Player"
          onClick={() => append({ name: "", id: "", score: 0 })}
          icon={<AddIcon />}
        />

        <SubmitButton
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />

        {/* Loading & Error States */}
        {(playersLoading || isSubmitting) && <LoadingSpinner />}

        {playersError && <ErrorSpan message={`Could not load players: ${playersError.message}`} />}

        {submitError && <ErrorSpan message={submitError} />}
      </div>
    </form>
  );
};

export default NewGameForm;