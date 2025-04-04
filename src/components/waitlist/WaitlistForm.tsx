// components/waitlist/WaitlistForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProfessionType,
  SportType,
  TeamLevelType,
  WaitlistEntry,
  SurveyData,
} from "@/types/waitlist";

interface WaitlistFormProps {
  onSuccess?: () => void;
  layout: "modal" | "section";
}

const waitlistFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  profession: z.enum([
    "Athlete",
    "Coach",
    "Team Manager",
    "Scout",
    "Athletic Director",
    "Parent",
    "Student",
    "Sports Analyst",
    "Other",
  ] as const),
  includeSurvey: z.boolean().default(false),
  survey: z
    .object({
      age: z.string().optional(),
      discoverySource: z
        .enum(["Social Media", "Friend or Colleague", "Search Engine", "Other"])
        .optional(),
      sport: z
        .enum([
          "Basketball",
          "Football",
          "Baseball",
          "Soccer",
          "Volleyball",
          "Tennis",
          "Track & Field",
          "Swimming",
          "Hockey",
          "Other",
        ] as const)
        .optional(),
      teamLevel: z
        .enum([
          "Youth",
          "High School",
          "College - D1",
          "College - D2",
          "College - D3",
          "College - NAIA",
          "Semi-Pro",
          "Professional",
          "Other",
        ] as const)
        .optional(),
      analyticsExperience: z.enum(["None", "Some", "Extensive"]).optional(),
      budgetRange: z
        .enum([
          "Under $1,000",
          "$1,000 - $5,000",
          "$5,000 - $10,000",
          "Over $10,000",
        ])
        .optional(),
      primaryGoal: z
        .enum([
          "Performance Improvement",
          "Recruitment Support",
          "Opponent Analysis",
          "Health/Injury Prevention",
          "Player Development",
          "Other",
        ])
        .optional(),
      additionalFeedback: z.string().optional(),
    })
    .optional(),
});

type FormValues = z.infer<typeof waitlistFormSchema>;

export function WaitlistForm({ onSuccess, layout }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      profession: undefined,
      includeSurvey: false,
      survey: {
        discoverySource: undefined,
        sport: undefined,
        teamLevel: undefined,
        analyticsExperience: undefined,
        budgetRange: undefined,
        primaryGoal: undefined,
        additionalFeedback: "",
      },
    },
  });

  const includeSurvey = form.watch("includeSurvey");
  const profession = form.watch("profession");

  // Get conditional questions based on profession
  const getConditionalQuestions = () => {
    switch (profession) {
      case "Coach":
        return (
          <>
            <FormField
              control={form.control}
              name="survey.teamLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Level</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-neutral-200 focus:ring-1 focus:ring-neutral-900">
                        <SelectValue placeholder="Select team level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "Youth",
                        "High School",
                        "College - D1",
                        "College - D2",
                        "College - D3",
                        "College - NAIA",
                        "Semi-Pro",
                        "Professional",
                        "Other",
                      ].map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="survey.primaryGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Goal with Analytics</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-neutral-200 focus:ring-1 focus:ring-neutral-900">
                        <SelectValue placeholder="Select primary goal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "Performance Improvement",
                        "Recruitment Support",
                        "Opponent Analysis",
                        "Health/Injury Prevention",
                        "Player Development",
                        "Other",
                      ].map((goal) => (
                        <SelectItem key={goal} value={goal}>
                          {goal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "Athlete":
        return (
          <>
            <FormField
              control={form.control}
              name="survey.age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age Range (Optional)</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="18-24" />
                        </FormControl>
                        <FormLabel className="font-normal">18-24</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="25-34" />
                        </FormControl>
                        <FormLabel className="font-normal">25-34</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="35-44" />
                        </FormControl>
                        <FormLabel className="font-normal">35-44</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="45+" />
                        </FormControl>
                        <FormLabel className="font-normal">45+</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="survey.sport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Sport</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-neutral-200 focus:ring-1 focus:ring-neutral-900">
                        <SelectValue placeholder="Select your sport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "Basketball",
                        "Football",
                        "Baseball",
                        "Soccer",
                        "Volleyball",
                        "Tennis",
                        "Track & Field",
                        "Swimming",
                        "Hockey",
                        "Other",
                      ].map((sport) => (
                        <SelectItem key={sport} value={sport}>
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="survey.teamLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competition Level</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-neutral-200 focus:ring-1 focus:ring-neutral-900">
                        <SelectValue placeholder="Select competition level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "Youth",
                        "High School",
                        "College - D1",
                        "College - D2",
                        "College - D3",
                        "College - NAIA",
                        "Semi-Pro",
                        "Professional",
                        "Other",
                      ].map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "Team Manager":
      case "Athletic Director":
        return (
          <>
            <FormField
              control={form.control}
              name="survey.budgetRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Analytics Budget</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-neutral-200 focus:ring-1 focus:ring-neutral-900">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "Under $1,000",
                        "$1,000 - $5,000",
                        "$5,000 - $10,000",
                        "Over $10,000",
                      ].map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="survey.analyticsExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Analytics Usage</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-neutral-200 focus:ring-1 focus:ring-neutral-900">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["None", "Some", "Extensive"].map((exp) => (
                        <SelectItem key={exp} value={exp}>
                          {exp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      default:
        return null;
    }
  };

  async function onSubmit(values: FormValues) {
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

      form.reset();
      toast.success("Successfully joined the waitlist!");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-700">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    {...field}
                    className="border-neutral-200 focus:ring-1 focus:ring-neutral-900"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-700">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    {...field}
                    className="border-neutral-200 focus:ring-1 focus:ring-neutral-900"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-700">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john.doe@example.com"
                  type="email"
                  {...field}
                  className="border-neutral-200 focus:ring-1 focus:ring-neutral-900"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-700">
                Phone Number{" "}
                <span className="font-normal text-neutral-400">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="+1 (555) 123-4567"
                  {...field}
                  className="border-neutral-200 focus:ring-1 focus:ring-neutral-900"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-700">Your Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="border-neutral-200 focus:ring-1 focus:ring-neutral-900">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Athlete",
                    "Coach",
                    "Team Manager",
                    "Scout",
                    "Athletic Director",
                    "Parent",
                    "Student",
                    "Sports Analyst",
                    "Other",
                  ].map((profession) => (
                    <SelectItem key={profession} value={profession}>
                      {profession}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {profession && (
          <FormField
            control={form.control}
            name="includeSurvey"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border border-neutral-100 bg-neutral-50 p-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:border-neutral-900 data-[state=checked]:bg-neutral-900"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer text-sm font-medium">
                    Help us tailor our analytics to your needs
                  </FormLabel>
                  <p className="text-sm text-neutral-500">
                    Answer a few additional questions (optional)
                  </p>
                </div>
              </FormItem>
            )}
          />
        )}

        {includeSurvey && profession && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-4 rounded-md border border-neutral-100 bg-neutral-50 p-4"
          >
            <FormField
              control={form.control}
              name="survey.discoverySource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about us?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-neutral-200 bg-white focus:ring-1 focus:ring-neutral-900">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "Social Media",
                        "Friend or Colleague",
                        "Search Engine",
                        "Other",
                      ].map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="survey.sport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Sport</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-neutral-200 bg-white focus:ring-1 focus:ring-neutral-900">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "Basketball",
                        "Football",
                        "Baseball",
                        "Soccer",
                        "Volleyball",
                        "Tennis",
                        "Track & Field",
                        "Swimming",
                        "Hockey",
                        "Other",
                      ].map((sport) => (
                        <SelectItem key={sport} value={sport}>
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {getConditionalQuestions()}

            <FormField
              control={form.control}
              name="survey.additionalFeedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Anything specific you're looking for?`}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share any specific needs or questions..."
                      className="h-20 resize-none border-neutral-200 bg-white focus:ring-1 focus:ring-neutral-900"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-neutral-900 text-white transition-colors hover:bg-neutral-800 ${layout === "section" ? "mt-6" : ""}`}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <svg
                className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
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
            "Join Waitlist"
          )}
        </Button>

        <p className="text-center text-xs text-neutral-500">
          {`By joining, you'll also receive our newsletter with sports analytics
          insights.`}
        </p>
      </form>
    </Form>
  );
}
