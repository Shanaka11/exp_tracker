import {
	Cable,
	Car,
	GraduationCap,
	House,
	Laptop,
	PawPrint,
	Phone,
	Pizza,
	Plane,
	TreePalm,
} from 'lucide-react';
import React from 'react';

type DynamicIconProps = {
	iconName: string;
};

const DynamicIcon = ({ iconName }: DynamicIconProps) => {
	if (iconName === 'house') {
		return <House />;
	}
	if (iconName === 'car') {
		return <Car />;
	}
	if (iconName === 'phone') {
		return <Phone />;
	}
	if (iconName === 'computer') {
		return <Laptop />;
	}
	if (iconName === 'degree') {
		return <GraduationCap />;
	}
	if (iconName === 'cable') {
		return <Cable />;
	}
	if (iconName === 'vacation') {
		return <TreePalm />;
	}
	if (iconName === 'travel') {
		return <Plane />;
	}
	if (iconName === 'food') {
		return <Pizza />;
	}
	if (iconName === 'animal') {
		return <PawPrint />;
	}
	return null;
};

export default DynamicIcon;
