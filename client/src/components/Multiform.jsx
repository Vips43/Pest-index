import React, { useState } from "react";
import { useMiscStore } from "../store/miscStore";
import { useForm } from "react-hook-form";

function Multiform() {
  const [submitted, setSubmitted] = useState(false);
  const setNext = useMiscStore((state) => state.setNext);
  const count = useMiscStore((state) => state.count);
  const resetCount = useMiscStore((state) => state.resetCount);
  const { data, setFormData } = useMiscStore();

  const initials = {
    address: "road 02, gali no 30, 2nd flor eliphinston",
    batch: "2nd",
    college: "Patkar varde College",
    course: "Computer",
    email: "john@doe.com",
    name: "Vipul Gehlot",
    phone: "9768348536",
    stream: "BCA",
    "student Age": "26",
    "student Email": "vipulgehlot43@gmail.com",
    "student Name": "vipul gehlot",
    "student RollNo": "26",
  };
  const localdata = JSON.parse(localStorage.getItem("data")) || {};

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: initials.address || "",
      batch: initials.batch || "",
      college: initials.college || "",
      course: initials.course || "",
      email: initials.email || "",
      name: initials.name || "",
      phone: initials.phone || "",
      stream: initials.stream || "",
      "student Age": initials["student Age"] || "",
      "student Email": initials["student Email"] || "",
      "student Name": initials["student Name"] || "",
      "student RollNo": initials["student RollNo"] || "",
    },
  });


  const submit = (data) => {
    if (count === 2) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
    if (count <= 2) {
      console.log("data:", data);
      localStorage.setItem("data", JSON.stringify(data));
      setFormData(localdata);
      setNext();
    } else return;
  };
  console.log(count);
  return (
    <div className="w-full bg-gray-300 p-5 ">
      <div className="max-w-2xl mx-auto flex items-center justify-between mb-5 *:transition-all **:transition-all **:duration-500 *:duration-500">
        {/* Step 1 */}
        <div className="relative flex items-center justify-center shrink-0">
          <div
            className="w-10 h-10 rounded-full grid place-items-center text-2xl leading-none bg-amber-700 text-white z-10"
            onClick={() => count > 0 && setNext(0)}
          >
            <p>1</p>
          </div>
        </div>
        {/* Connecting Line */}
        <div
          className={`flex-1 h-1 mx-2 ${count >= 1 ? "bg-amber-700" : "bg-gray-700"} z-0`}
        />

        {/* Step 2 */}
        <div className="relative flex items-center justify-center shrink-0">
          <div
            className={`w-10 h-10 rounded-full grid place-items-center text-2xl leading-none ${count >= 1 ? "bg-amber-700" : "bg-gray-600"} text-white z-10`}
            onClick={() => count > 1 && setNext(1)}
          >
            <p>2</p>
          </div>
        </div>
        {/* Connecting Line */}
        <div
          className={`flex-1 h-1 mx-2 ${count >= 2 ? "bg-amber-700" : "bg-gray-700"}`}
        />

        {/* Step 3 (No trailing line) */}
        <div
          className="relative flex items-center justify-center shrink-0"
          onClick={() => count > 2 && setNext(2)}
        >
          <div
            className={`w-10 h-10 rounded-full grid place-items-center text-2xl leading-none ${count >= 2 ? "bg-amber-700" : "bg-gray-600"} text-white z-10`}
          >
            <p>3</p>
          </div>
        </div>
      </div>

      <form action="" onSubmit={handleSubmit(submit)}>
        {count === 0 && (
          <div className="p-6 bg-white grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
            <InputField
              label="name"
              type="text"
              register={register}
              required={true}
              error={errors.name}
            />
            <InputField
              label="email"
              type="email"
              register={register}
              error={errors.email}
            />
            <InputField
              label="phone"
              type="tel"
              register={register}
              error={errors.phone}
            />
            <InputField
              label="address"
              type="text"
              register={register}
              error={errors.address}
            />
          </div>
        )}
        {count === 1 && (
          <div className="p-6 bg-white grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
            <InputField
              label="college"
              type="text"
              register={register}
              error={errors.college}
              required={true}
            />
            <InputField
              label="batch"
              type="text"
              register={register}
              error={errors.batch}
              required={true}
            />
            <InputField
              label="stream"
              type="text"
              register={register}
              error={errors.stream}
              required={true}
            />
            <InputField
              label="course"
              type="text"
              register={register}
              error={errors.course}
              required={true}
            />
          </div>
        )}
        {count === 2 && (
          <div className="p-6 bg-white grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
            <InputField
              label="student Name"
              type="text"
              register={register}
              error={errors.studentName}
              required={true}
            />
            <InputField
              label="student Age"
              type="text"
              register={register}
              error={errors.studentAge}
              required={true}
            />
            <InputField
              label="student Email"
              type="email"
              register={register}
              error={errors.studentEmail}
              required={true}
            />
            <InputField
              label="student RollNo"
              type="text"
              register={register}
              error={errors.studentRollNo}
              required={true}
            />
          </div>
        )}
        {count === 3 && (
          <div>
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Phone No:</strong> {data.phone}
            </p>
            <p>
              <strong>Address:</strong> {data.address}
            </p>
            <p>
              <strong>College Name:</strong> {data.college}
            </p>
          </div>
        )}
        <div className="flex justify-center gap-5 mt-5">
          <button
            type="submit"
            disabled={submitted}
            className="outline px-4 py-1 rounded-md w-fit disabled:cursor-not-allowed disabled:opacity-70"
          >
            {count >= 2 ? "submit" : "Next →"}
          </button>
          <button
            type="button"
            className="outline px-4 py-1 rounded-md w-fit"
            onClick={() => {
              reset();
              resetCount();
              setSubmitted(false);
              localStorage.removeItem("data")
            }}
          >
            reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Multiform;

function InputField({ label, type, register, required = false, error }) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor={label} className="uppercase font-semibold">
          Enter {label} {required && <sup className="text-red-600">*</sup>}
        </label>
        <input
          id={label}
          type={type}
          {...register(`${label}`, { required: required })}
          className={`outline ${error ? "bg-red-100 text-red-700" : "outline-gray-400"} rounded-md w-full px-3 py-1 text-lg `}
        />
        {error && <span>{error.message || `${label} is invalid`}</span>}
      </div>
    </>
  );
}
