import { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch.ts";
import type { FormValues } from "./types.ts";
import LoadingSpinner from "../../Atoms/LoadingSpinner/LoadingSpinner.tsx";
import ErrorSpan from "../../Atoms/ErrorSpan/ErrorSpan.tsx";
import NumberInput from "../../Atoms/NumberInput/NumberInput.tsx";
import AddButton from "../../Atoms/AddButton/AddButton.tsx";
import SubmitButton from "../../Atoms/SubmitButton/SubmitButton.tsx";

const NewGameSelect = () => {
  const { data, loading, error } = useFetch(import.meta.env.VITE_API_URL + 'players');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize form with name (for UI) and id (for backend)
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
    // Transform the data so the backend only receives IDs and scores
    const payload = {
      gameName: formData.gameName,
      buyIn: formData.buyIn,
      players: formData.players.map(p => ({
        id: p.id,
        score: p.score
      }))
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save the game');
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      ref={containerRef}
      className="flex flex-col gap-6 w-full max-w-md p-4"
    >
      <input
        {...register("gameName", { required: true })}
        type="text"
        autoComplete="off"
        placeholder="Your game name..."
        className="grow px-4 py-2 bg-white/20 placeholder:text-white/50 text-gray-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
      />

      <NumberInput
        id="buyIn"
        label="Buy in:"
        {...register("buyIn", { valueAsNumber: true, min: 0 })}
        min={0}
        max={1000}
        placeholder="0"
      />

      <p className="text-lg text-gray-100 m-0">Assign Players:</p>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="relative group">
            <div className="flex gap-2">
              <div className="relative flex flex-1 gap-2">
                {/* Visual Input: Updates 'name' for the dropdown filter */}
                <input
                  {...register(`players.${index}.name` as const, { required: true })}
                  type="text"
                  autoComplete="off"
                  onFocus={() => setActiveDropdown(index)}
                  placeholder="Type player name..."
                  className="grow px-4 py-2 bg-white/20 placeholder:text-white/50 text-gray-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                />

                {/* Hidden ID field: This is what actually maps to the backend logic */}
                <input
                  type="hidden"
                  {...register(`players.${index}.id` as const, { required: true })}
                />

                {/* Dropdown Logic */}
                {activeDropdown === index && data && (
                  <ul className="absolute z-10 top-full w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto py-1">
                    {data?.data
                      .filter(p =>
                        // Filter by what is typed in the 'name' input
                        p.name.toLowerCase().includes(watchedPlayers[index].name.toLowerCase()) &&
                        // Ensure this player hasn't already been added to the game
                        !watchedPlayers.some((sp, i) => i !== index && sp.id === p.id)
                      )
                      .map((p) => (
                        <li
                          key={p.id}
                          onClick={() => {
                            // Sync both fields upon selection
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
                  </ul>
                )}

                {watchedPlayers[index].name?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setValue(`players.${index}.name`, "");
                      setValue(`players.${index}.id`, "");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple p-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              <NumberInput
                {...register(`players.${index}.score` as const, {
                    required: true,
                    valueAsNumber: true,
                    min: 0
                })}
                id={`players.${index}.score`}
                label="Score:"
                min={0}
                max={100000}
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

      <div className="flex flex-col gap-2">
        <AddButton
          text="Add Player"
          onClick={() => append({ name: "", id: "", score: 0 })}
        />
        <SubmitButton onClick={handleSubmit(onSubmit)} />
        {loading && <LoadingSpinner />}
        {error && <ErrorSpan message={error.message} />}
      </div>
    </form>
  );
};

export default NewGameSelect;