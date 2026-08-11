import { useEffect, useState } from "react";
import { useForm,Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiImage, FiUpload, } from "react-icons/fi";

import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventFormData } from "../schemas/eventSchema";
import type z from "zod";
import { useEvent } from "../context/EventContext";

const EventForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { events, updateEvent, createEvent } = useEvent();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<z.input<typeof eventSchema>, any, z.output<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      location: "",
      category: "",
      totalSeats: 0,
      availableSeats: 0,
      ticketPrice: 0,
    },
  });
  //LOAD EVENT FOR EDIT MODE

  useEffect(() => {
    if (!isEditMode || !id) return;
    const existingEvent = events.find((item) => item._id === id);
    if (!existingEvent) return;
    setPageLoading(true);
    reset({
      title: existingEvent.title,
      description: existingEvent.description,
      date: existingEvent.date.slice(0, 16),
      location: existingEvent.location,
      category: existingEvent.category,
      totalSeats: existingEvent.totalSeats,
      availableSeats: existingEvent.availableSeats,
      ticketPrice: existingEvent.ticketPrice,
    });
    setPreview(existingEvent.imageUrl);
    setPageLoading(false);
  }, [id, isEditMode, events, reset]);

  const onSubmit = async (data: EventFormData) => {
    try {
       if (!isEditMode && !data.image) {
      alert("Please select an event image");
      return;
    }
      setSubmitLoading(true);
      if (isEditMode && id) {
       console.log("update is calling")
        await updateEvent(id, data);
      } else {
       
        await createEvent(data);
      }
      navigate("/admin/events");
    } catch (error: any) {
      alert(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          `Unable to ${isEditMode ? "update" : "create"} event.`,
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (!file) return;
    onChange(file);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };
  if (pageLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        {" "}
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
          {" "}
          <div className="animate-pulse space-y-6">
            {" "}
            <div className="h-8 w-48 rounded bg-gray-200" />{" "}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              {" "}
              <div className="space-y-6">
                {" "}
                <div className="h-12 rounded-xl bg-gray-200" />{" "}
                <div className="h-32 rounded-xl bg-gray-200" />{" "}
                <div className="grid gap-6 sm:grid-cols-2">
                  {" "}
                  <div className="h-12 rounded-xl bg-gray-200" />{" "}
                  <div className="h-12 rounded-xl bg-gray-200" />{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </main>
    );
  }
  /* ======================================== UI ======================================== */ return (
    <main className="min-h-screen bg-gray-50">
      {" "}
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
        {" "}
        {/* Header */}{" "}
        <div className="mb-8">
          {" "}
          <button
            type="button"
            onClick={() => navigate("/admin/events")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-gray-900"
          >
            {" "}
            <FiArrowLeft /> Back to Events{" "}
          </button>{" "}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {" "}
            {isEditMode ? "Edit Event" : "Create New Event"}{" "}
          </h1>{" "}
          <p className="mt-2 text-sm text-gray-500">
            {" "}
            {isEditMode
              ? "Update the information of your event."
              : "Add a new event to your EventHub platform."}{" "}
          </p>{" "}
        </div>{" "}
        {/* Form */}{" "}
        <form
        onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          {" "}
          {/* Event Information */}{" "}
          <div className="border-b border-gray-100 p-6 sm:p-8">
            {" "}
            <div className="mb-6">
              {" "}
              <h2 className="text-lg font-bold text-gray-900">
                {" "}
                Event Information{" "}
              </h2>{" "}
              <p className="mt-1 text-sm text-gray-500">
                {" "}
                Enter the basic information about your event.{" "}
              </p>{" "}
            </div>{" "}
            <div className="grid gap-6 sm:grid-cols-2">
              {" "}
              {/* Title */}{" "}
              <div className="sm:col-span-2">
                {" "}
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {" "}
                  Event Title{" "}
                </label>{" "}
                <input
                  {...register("title")}
                  type="text"
                  placeholder="e.g. Faisalabad Tech Conference 2026"
                  className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${errors.title ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
                />{" "}
                {errors.title && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {" "}
                    {errors.title.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
              {/* Description */}{" "}
              <div className="sm:col-span-2">
                {" "}
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {" "}
                  Description{" "}
                </label>{" "}
                <textarea
                  {...register("description")}
                  rows={5}
                  placeholder="Describe your event..."
                  className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${errors.description ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
                />{" "}
                {errors.description && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {" "}
                    {errors.description.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
              {/* Date */}{" "}
              <div>
                {" "}
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {" "}
                  Event Date & Time{" "}
                </label>{" "}
                <input
                  {...register("date")}
                  type="datetime-local"
                  className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4 ${errors.date ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
                />{" "}
                {errors.date && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {" "}
                    {errors.date.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
              {/* Category */}{" "}
              <div>
                {" "}
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {" "}
                  Category{" "}
                </label>{" "}
                <input
                  {...register("category")}
                  type="text"
                  placeholder="e.g. Technology"
                  className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${errors.category ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
                />{" "}
                {errors.category && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {" "}
                    {errors.category.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
              {/* Location */}{" "}
              <div className="sm:col-span-2">
                {" "}
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {" "}
                  Location{" "}
                </label>{" "}
                <input
                  {...register("location")}
                  type="text"
                  placeholder="e.g. Serena Hotel, Faisalabad"
                  className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${errors.location ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
                />{" "}
                {errors.location && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {" "}
                    {errors.location.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Capacity */}{" "}
          <div className="border-b border-gray-100 p-6 sm:p-8">
            {" "}
            <div className="mb-6">
              {" "}
              <h2 className="text-lg font-bold text-gray-900">
                {" "}
                Ticket & Capacity{" "}
              </h2>{" "}
              <p className="mt-1 text-sm text-gray-500">
                {" "}
                Set the event capacity and ticket price.{" "}
              </p>{" "}
            </div>{" "}
            <div className="grid gap-6 sm:grid-cols-3">
              {" "}
              {/* Total Seats */}{" "}
              <div>
                {" "}
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {" "}
                  Total Seats{" "}
                </label>{" "}
                <input
                  {...register("totalSeats", { valueAsNumber: true })}
                  type="number"
                  min="1"
                  className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4 ${errors.totalSeats ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
                />{" "}
                {errors.totalSeats && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {" "}
                    {errors.totalSeats.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
              {/* Available Seats */}{" "}
              <div>
                {" "}
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {" "}
                  Available Seats{" "}
                </label>{" "}
                <input
                  {...register("availableSeats", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4 ${errors.availableSeats ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
                />{" "}
                {errors.availableSeats && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {" "}
                    {errors.availableSeats.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
              {/* Ticket Price */}{" "}
              <div>
                {" "}
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {" "}
                  Ticket Price (PKR){" "}
                </label>{" "}
                <input
                  {...register("ticketPrice", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4 ${errors.ticketPrice ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
                />{" "}
                {errors.ticketPrice && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {" "}
                    {errors.ticketPrice.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Image */}{" "}
          <div className="border-b border-gray-100 p-6 sm:p-8">
            {" "}
            <div className="mb-6">
              {" "}
              <h2 className="text-lg font-bold text-gray-900">
                {" "}
                Event Image{" "}
              </h2>{" "}
              <p className="mt-1 text-sm text-gray-500">
                {" "}
                {isEditMode
                  ? "Upload a new image only if you want to replace the current one."
                  : "Upload a high-quality image for your event."}{" "}
              </p>{" "}
            </div>{" "}
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <div>
                  {" "}
                  <label
                    htmlFor="event-image"
                    className={`relative flex min-h-64 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition ${errors.image ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/40"}`}
                  >
                    {" "}
                    {preview ? (
                      <>
                        {" "}
                        <img
                          src={preview}
                          alt="Event preview"
                          className="absolute inset-0 h-full w-full object-cover"
                        />{" "}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/70 px-4 py-2 text-xs font-semibold text-white">
                          {" "}
                          Click to change image{" "}
                        </div>{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          {" "}
                          <FiImage className="text-2xl" />{" "}
                        </div>{" "}
                        <p className="mt-4 text-sm font-semibold text-gray-700">
                          {" "}
                          Click to upload event image{" "}
                        </p>{" "}
                        <p className="mt-1 text-xs text-gray-400">
                          {" "}
                          PNG, JPG or JPEG{" "}
                        </p>{" "}
                        <FiUpload className="mt-4 text-gray-400" />{" "}
                      </>
                    )}{" "}
                  </label>{" "}
                  <input
                    id="event-image"
                    type="file"
                    
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleImageChange(file, field.onChange);
                    }}
                  />{" "}
                  {errors.image && (
                    <p className="mt-2 text-xs font-medium text-red-600">
                      {" "}
                      {errors.image.message}{" "}
                    </p>
                  )}{" "}
                </div>
              )}
            />{" "}
          </div>{" "}
          {/* Actions */}{" "}
          <div className="flex flex-col-reverse gap-3 bg-gray-50 p-6 sm:flex-row sm:justify-end sm:p-8">
            {" "}
            <button
              type="button"
              onClick={() => navigate("/admin/events")}
              className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              {" "}
              Cancel{" "}
            </button>{" "}
            <button
              type="submit"
              disabled={submitLoading}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {" "}
              {submitLoading
                ? isEditMode
                  ? "Updating Event..."
                  : "Creating Event..."
                : isEditMode
                  ? "Update Event"
                  : "Create Event"}{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </main>
  );
};

export default EventForm;
