import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Validation schema for both waitlist and survey entries
const waitlistFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  showSurvey: z.boolean().default(false),
  survey: z
    .object({
      discoverySource: z
        .enum(["Social Media", "Friend or Colleague", "Search Engine", "Other"])
        .optional(),
      age: z.enum(["18-24", "25-34", "35-44", "45+"]).optional(),
      profession: z.string().optional(),
      additionalFeedback: z.string().optional(),
    })
    .optional(),
});

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      showSurvey: false,
      survey: {
        discoverySource: undefined,
        age: undefined,
        profession: "",
        additionalFeedback: "",
      },
    },
  });

  const showSurvey = form.watch("showSurvey");

  async function onSubmit(values: WaitlistFormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSuccess(true);
      form.reset();
      toast.success("Successfully joined the waitlist!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl"
      >
        {/* Background decorative elements */}
        <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-blue-100 opacity-50 blur-xl"></div>
        <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-purple-100 opacity-60 blur-xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative z-10"
        >
          <h2 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-3xl font-bold text-transparent">
            Join Statoracle Waitlist
          </h2>
          <p className="mb-8 text-center text-gray-500">
            Be the first to access our premium sports analytics platform
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          className="border-gray-200 bg-gray-50 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          className="border-gray-200 bg-gray-50 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@example.com"
                        type="email"
                        {...field}
                        className="border-gray-200 bg-gray-50 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Phone Number{" "}
                      <span className="text-gray-400">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1 (555) 123-4567"
                        {...field}
                        className="border-gray-200 bg-gray-50 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Survey Toggle */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FormField
                  control={form.control}
                  name="showSurvey"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium text-gray-800">
                          Help us improve with a quick survey
                        </FormLabel>
                        <FormDescription className="text-xs text-gray-500">
                          Answer a few optional questions to help us tailor our
                          service
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Survey Section (Conditional) */}
              <AnimatePresence>
                {showSurvey && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-6 rounded-xl border border-gray-100 bg-gray-50 p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-sm text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"></path>
                            <path d="m9 22 4-10 4 10"></path>
                            <path d="M9 8h6"></path>
                            <path d="M9 12h4"></path>
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Survey Questions
                        </h3>
                      </div>

                      {/* Discovery Source */}
                      <FormField
                        control={form.control}
                        name="survey.discoverySource"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-sm font-medium text-gray-700">
                              How did you hear about us?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-2 gap-2"
                              >
                                {[
                                  "Social Media",
                                  "Friend or Colleague",
                                  "Search Engine",
                                  "Other",
                                ].map((option) => (
                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    key={option}
                                  >
                                    <FormItem className="flex cursor-pointer items-center space-y-0 space-x-2 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-100">
                                      <FormControl>
                                        <RadioGroupItem
                                          value={option}
                                          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                                        />
                                      </FormControl>
                                      <FormLabel className="w-full cursor-pointer text-sm font-normal">
                                        {option}
                                      </FormLabel>
                                    </FormItem>
                                  </motion.div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Age Range */}
                      <FormField
                        control={form.control}
                        name="survey.age"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Your Age Range
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-2 gap-2"
                              >
                                {["18-24", "25-34", "35-44", "45+"].map(
                                  (age) => (
                                    <motion.div
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      key={age}
                                    >
                                      <FormItem className="flex cursor-pointer items-center space-y-0 space-x-2 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-100">
                                        <FormControl>
                                          <RadioGroupItem
                                            value={age}
                                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                                          />
                                        </FormControl>
                                        <FormLabel className="w-full cursor-pointer text-sm font-normal">
                                          {age}
                                        </FormLabel>
                                      </FormItem>
                                    </motion.div>
                                  ),
                                )}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Profession */}
                      <FormField
                        control={form.control}
                        name="survey.profession"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Profession{" "}
                              <span className="text-gray-400">(optional)</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="E.g., Coach, Athlete, Analyst"
                                {...field}
                                className="border-gray-200 bg-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Additional Feedback */}
                      <FormField
                        control={form.control}
                        name="survey.additionalFeedback"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Additional Feedback{" "}
                              <span className="text-gray-400">(optional)</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Share any thoughts or questions you have"
                                className="h-24 resize-none border-gray-200 bg-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-base font-medium text-white hover:from-blue-700 hover:to-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Join the Waitlist"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <Dialog
            open={isSuccess}
            onOpenChange={(open) => !open && setIsSuccess(false)}
          >
            <DialogContent className="overflow-hidden rounded-2xl bg-white p-0 sm:max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Visual elements */}
                <div className="absolute -top-10 -left-10 h-20 w-20 rounded-full bg-blue-100 opacity-50 blur-lg"></div>
                <div className="absolute -right-10 -bottom-10 h-20 w-20 rounded-full bg-purple-100 opacity-60 blur-lg"></div>

                <div className="p-6 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>

                  <h3 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                    Thank You!
                  </h3>
                  <p className="mb-6 text-gray-600">
                    {`You've been successfully added to our waitlist. We'll notify
                    you as soon as we launch!`}
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setIsSuccess(false)}
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-2 text-white hover:from-blue-700 hover:to-purple-700"
                    >
                      Great!
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
