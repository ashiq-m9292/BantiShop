let isPressed = false;

export const singlePress = (callback: () => void) => {
    if (isPressed) return;

    isPressed = true;

    callback();

    setTimeout(() => {
        isPressed = false;
    }, 1000);

};