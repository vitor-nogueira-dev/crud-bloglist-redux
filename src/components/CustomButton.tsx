import React from 'react';

interface CustomButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    disabled?: boolean;
    variant: 'primary' | 'secondary' | 'success' | 'danger';
    children: React.ReactNode;
    margin?: boolean;
    id?: string;
}

export default function CustomButton({ onClick, disabled, variant, children, margin, id }: CustomButtonProps) {
    const getButtonStyles = (): string => {
        switch (variant) {
            case 'primary':
                return `font-bold w-[111px] h-[32px] ${!disabled ? "bg-[#2a5deb]" : "active:bg-[#2a5deb] bg-[#7695EC]"} rounded-lg text-sm text-center uppercase text-white ${margin ? 'mr-4' : ''}`;
            case 'secondary':
                return 'font-bold w-[120px] h-[32px] border border-[#999999] rounded-md text-sm text-center uppercase hover:shadow-xl transition-all';
            case 'success':
                return 'font-bold w-[120px] h-[32px] rounded-md text-sm text-center uppercase text-white bg-[#47B960] hover:shadow-xl transition-all';
            case 'danger':
                return 'font-bold w-[120px] h-[32px] rounded-md text-sm text-center uppercase text-white bg-[#FF5151] hover:shadow-xl transition-all';
            default:
                return '';
        }
    };

    return (
        <button
            type="button"
            id={id}
            onClick={onClick}
            disabled={disabled}
            className={getButtonStyles()}
        >
            {children}
        </button>
    );
};
