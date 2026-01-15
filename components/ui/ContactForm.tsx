"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { contactFormSchema, ContactFormData } from "@/lib/utils/validation";
import Button from "@/components/ui/Button";

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const t = useTranslations("contact");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || "Failed to send message");
      }
      setIsSubmitted(true);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-white flex items-center justify-center ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="mb-6">
            <Image
              src="/images/logo.svg"
              alt="YIGO Logo"
              width={120}
              height={40}
              className="h-14 w-auto mx-auto"
            />
          </div>
          <h1 className="font-heading text-3xl font-bold text-neutral-900 mb-4">
            {t("form.success.title")}
          </h1>
          <p className="text-neutral-600 mb-8">{t("form.success.message")}</p>
          <Button onClick={() => setIsSubmitted(false)}>
            {t("form.success.sendAnother")}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`bg-white ${className}`}>
      <div className="md:max-w-6xl max-w-full mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="font-heading text-4xl lg:text-7xl font-light text-black leading-tight">
              {t("title")}
            </h1>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex-shrink-0">
                  <Image
                    src="/images/email_icon.svg"
                    alt="Email icon"
                    width={24}
                    height={24}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-black font-medium">{t("email")}</p>
                  <div className="w-full h-px bg-black mt-1"></div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex-shrink-0">
                  <Image
                    src="/images/call_icon.svg"
                    alt="Phone icon"
                    width={24}
                    height={24}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-black font-medium">{t("phone")}</p>
                  <div className="w-full h-px bg-black mt-1"></div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex-shrink-0">
                  <Image
                    src="/images/address_icon.svg"
                    alt="Address icon"
                    width={24}
                    height={24}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-black font-medium whitespace-pre-line">
                    {t("address")}
                  </p>
                  <div className="w-full h-px bg-black mt-1"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Name and Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-black font-medium mb-2"
                  >
                    {t("form.name")}
                  </label>
                  <div className="w-full h-px bg-black mb-2"></div>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full bg-transparent border-none outline-none text-black placeholder-gray-400"
                    placeholder=""
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-black font-medium mb-2"
                  >
                    {t("form.company")}
                  </label>
                  <div className="w-full h-px bg-black mb-2"></div>
                  <input
                    {...register("company")}
                    type="text"
                    id="company"
                    className="w-full bg-transparent border-none outline-none text-black placeholder-gray-400"
                    placeholder=""
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.company.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-black font-medium mb-2"
                  >
                    {t("form.email")}
                  </label>
                  <div className="w-full h-px bg-black mb-2"></div>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="w-full bg-transparent border-none outline-none text-black placeholder-gray-400"
                    placeholder=""
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-black font-medium mb-2"
                  >
                    {t("form.phone")}
                  </label>
                  <div className="w-full h-px bg-black mb-2"></div>
                  <input
                    {...register("phone")}
                    type="tel"
                    id="phone"
                    className="w-full bg-transparent border-none outline-none text-black placeholder-gray-400"
                    placeholder=""
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-black font-medium mb-2"
                >
                  {t("form.message")}
                </label>
                <div className="w-full h-px bg-black mb-2"></div>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={6}
                  className="w-full bg-transparent border-none outline-none text-black placeholder-gray-400 resize-none"
                  placeholder=""
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t("form.sending") : t("form.send")}
                </button>
              </div>
              {errorMessage && (
                <p className="text-sm text-red-600 text-right">
                  {errorMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
