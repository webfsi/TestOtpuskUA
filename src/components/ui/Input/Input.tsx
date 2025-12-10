import { forwardRef, InputHTMLAttributes } from 'react';
import './Input.scss';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string;
	size?: 'sm' | 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, size = 'md', className = '', disabled, ...rest }, ref) => {
		const inputClasses = [
			'input',
			`input--${size}`,
			disabled && 'input--disabled',
			className,
		]
			.filter(Boolean)
			.join(' ');

		return (
			<div className="input-wrapper">
				{label && <label className="input__label">{label}</label>}
				<input
					ref={ref}
					className={inputClasses}
					disabled={disabled}
					{...rest}
				/>
			</div>
		);
	}
);

Input.displayName = 'Input';

