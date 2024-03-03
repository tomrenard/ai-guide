import type { NextPage } from "next";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  city: string;
  days: number;
  preferences: string;
}

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [lol, setLol] = useState<any>(null);

  const submitForm: SubmitHandler<IFormInput> = async (formData) => {
    const response = await fetch("/api/itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error("Failed to fetch itinerary");
      return;
    }

    const data = await response.json();
    console.log(data.itinerary);
    setLol(data.itinerary);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <label htmlFor="city">City:</label>
          <input id="city" {...register("city", { required: true })} />
          {errors.city && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="days">Days:</label>
          <input
            id="days"
            type="number"
            {...register("days", { required: true, min: 1 })}
          />
          {errors.days && (
            <span>This field is required and must be at least 1</span>
          )}
        </div>

        <div>
          <label htmlFor="preferences">Preferences:</label>
          <input id="preferences" {...register("preferences")} />
        </div>

        <button type="submit">Submit</button>
      </form>
      <p>{lol?.content}</p>
    </div>
  );
};

export default Home;
