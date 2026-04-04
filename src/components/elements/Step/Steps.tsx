import type { IStep } from '@elements/Step/index.ts';

interface StepsProps {
    steps: IStep[];
    currentStep: number;
    orientation?: 'horizontal' | 'vertical';
    variant?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | '';
    className?: string;
    stepClassName?: string;
    onStepClick?: (stepIndex: number) => void;
    clickable?: boolean;
}

const Steps = ({
    steps,
    currentStep,
    orientation = 'horizontal',
    variant = '',
    className = '',
    stepClassName = '',
    onStepClick,
    clickable = false,
}: StepsProps) => {
    const getStepStatus = (index: number) => {
        if (index < currentStep) return 'completed';
        if (index === currentStep) return 'active';
        return 'pending';
    };

    const getStepClasses = (index: number) => {
        const status = getStepStatus(index);
        const baseClasses = 'step';

        const stepStatusClasses = {
            completed: 'step-primary',
            active: 'step-active',
            pending: '',
        };

        const clickableClass = clickable ? 'cursor-pointer' : '';

        return `${baseClasses} ${stepClassName} ${stepStatusClasses[status]} ${clickableClass}`.trim();
    };

    const handleStepClick = (index: number) => {
        if (clickable && onStepClick) {
            onStepClick(index);
        }
    };

    const orientationClass = orientation === 'horizontal' ? 'steps-horizontal' : 'steps-vertical';
    const variantClass = {
        neutral: 'steps-neutral',
        primary: 'steps-primary',
        secondary: 'steps-secondary',
        accent: 'steps-accent',
        info: 'steps-info',
        success: 'steps-success',
        warning: 'steps-warning',
        error: 'steps-error',
        default: '',
    };

    return (
        <div className={`${className}`}>
            <div className="mb-2 flex justify-between text-sm md:hidden">
                <span className="text-base-content">{steps[currentStep].title}</span>
                <span className="text-secondary">Step {currentStep + 1}</span>
            </div>
            <ul className={`steps max-md:w-full ${orientationClass} ${variantClass[variant ? variant : 'default']}`}>
                {steps.map((step, index) => (
                    <li
                        key={step.id}
                        className={getStepClasses(index)}
                        data-content={step.content || String(index + 1).padStart(2, '0')}
                        onClick={() => handleStepClick(index)}
                        title={step.description}
                    >
                        <span className="max-md:hidden">{step.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Steps;
