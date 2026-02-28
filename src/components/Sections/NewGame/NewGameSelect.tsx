import { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch.ts";
import PrimaryButton from "../../Atoms/PrimaryButton/PrimaryButton.tsx";
import type { FormValues } from "./types.ts";
import LoadingSpinner from "../../Atoms/LoadingSpinner/LoadingSpinner.tsx";
import ErrorSpan from "../../Atoms/ErrorSpan/ErrorSpan.tsx";
import NumberInput from "../../Atoms/NumberInput/NumberInput.tsx";

const NewGameSelect = () => {
  const { data, loading, error } = useFetch(import.meta.env.VITE_API_URL + 'players');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Initialize the form
  const { register, control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      players: [{ name: "", score: 0 }]
    }
  });

  // 2. Setup useFieldArray for dynamic rows
  const { fields, append, remove } = useFieldArray({
    control,
    name: "players"
  });

  // Watch the players array so we can filter the dropdown in real-time
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
    console.log("Submitted Data:", formData.players);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}games`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData.players.filter(player => player.name.trim() !== "")),
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
    // Wrap in a <form> and use handleSubmit
    <form
      onSubmit={handleSubmit(onSubmit)}
      ref={containerRef}
      className="flex flex-col gap-6 w-full max-w-md p-4"
    >
      <h4 className="text-xl text-gray-100">Assign Players:</h4>
      <NumberInput
        id="buyIn"
        label="Buy in:"
        {...register("buyIn", { valueAsNumber: true, min: 0 })}
        min={0}
        max={1000}
        placeholder="0"
      />

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="relative group">
            <div className="flex gap-2">
              <div className="relative flex flex-1 gap-2">
                <input
                  // 3. Register the name input
                  {...register(`players.${index}.name` as const, { required: true })}
                  type="text"
                  autoComplete="off"
                  onFocus={() => setActiveDropdown(index)}
                  placeholder="Type or select player..."
                  className="grow px-4 py-2 bg-white/20 placeholder:text-white/50 text-gray-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                />

                {/* Dropdown Logic */}
                {activeDropdown === index && data && (
                  <ul className="absolute z-10 top-full w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto py-1">
                    {data?.data
                      .filter(p =>
                        p.name.toLowerCase().includes(watchedPlayers[index].name.toLowerCase()) &&
                        !watchedPlayers.some((sp, i) => i !== index && sp.name === p.name)
                      )
                      .map((p) => (
                        <li
                          key={p.id}
                          onClick={() => {
                            // 4. Update value manually via RHF
                            setValue(`players.${index}.name`, p.name);
                            setActiveDropdown(null);
                          }}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 flex justify-between items-center"
                        >
                          {p.name}
                          <span className="text-xs text-gray-400">Existing</span>
                        </li>
                      ))}
                  </ul>
                )}

                {watchedPlayers[index].name?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setValue(`players.${index}.name`, "")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple p-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              <NumberInput
                // 5. Register the score input (valueAsNumber is a great RHF feature)
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
        <PrimaryButton
          text="+ Add Player"
          onClick={() => append({ name: "", score: 0 })}
          type="button"
        />
        <PrimaryButton
          text="Submit"
          type="submit"
        />
        {loading && <LoadingSpinner />}
        {error && <ErrorSpan message={error.message} />}
      </div>
    </form>
  );
};

export default NewGameSelect;
