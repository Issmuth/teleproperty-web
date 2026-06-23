'use client';

type AuthStepperProps = {
  currentStep: number;
  steps: number;
};

export function AuthStepper({ currentStep, steps }: AuthStepperProps) {
  return (
    <div className="flex items-center mb-6 md:mb-8">
      {Array.from({ length: steps }, (_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isDone = step < currentStep;

        return (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center z-10 ${
                isDone || isActive
                  ? 'bg-[#22C55E] border-[#22C55E]'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
              }`}
            >
              <span
                className={`text-xs font-black ${
                  isDone || isActive
                    ? 'text-white'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {step}
              </span>
            </div>

            {step !== steps && (
              <div
                className={`flex-1 h-0.5 mx-2 rounded-full ${
                  isDone
                    ? 'bg-[#22C55E]'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
