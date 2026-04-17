import React from 'react';
import { Avatar } from 'react-native-paper';

const AvatarC = ({
    type = 'image', // image | text | icon
    source,
    label,
    icon,
    size = 40,
    style,
}: any) => {
    if (type === 'image' && source) {
        return <Avatar.Image source={source} size={size} style={style} />;
    }

    if (type === 'text' && label) {
        return <Avatar.Text label={label} size={size} style={style} />;
    }

    if (type === 'icon' && icon) {
        return <Avatar.Icon icon={icon} size={size} style={style} />;
    }

    return null;
};

export default AvatarC;