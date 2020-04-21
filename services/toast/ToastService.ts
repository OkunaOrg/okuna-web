import { ToastProgrammatic as Toast } from 'buefy';
import { IToastService, ToastConfig } from '~/services/toast/IToastService';
import { injectable } from '~/node_modules/inversify';
import { ToastType } from '~/services/toast/lib/ToastType';

@injectable()
export class ToastService implements IToastService {
    show(config: ToastConfig) {
        let bulmaToastColorModifier;

        switch (config.type) {
            case ToastType.error:
                bulmaToastColorModifier = 'is-danger';
                break;
            case ToastType.info:
                bulmaToastColorModifier = 'is-info';
                break;
            case ToastType.success:
                bulmaToastColorModifier = 'is-success';
                break;
        }

        Toast.open(
            {
                message: config.message,
                type: bulmaToastColorModifier,
                duration: config.duration,
                queue: config.queue
            }
        )

    }
}