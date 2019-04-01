import { Toast } from 'native-base';

export const toastr = {
    showToast: (message, type = null, duration = 10000) => {
        Toast.show({
            text: message,
            type,
            duration,
            position: 'bottom',
            textStyle: { textAlign: 'center' },
            buttonText: 'Oк',
        });
    },
};
