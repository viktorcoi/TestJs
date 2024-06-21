import styles from './StepQuestion.module.scss';
import {classNames} from "../../helpers/classNames";

interface StepQuestionProps {
    active?: boolean;
    done?: boolean;
}

const StepQuestion = (props: StepQuestionProps) => {

    const {
        active = false,
        done = false,
    } = props;

    return (
        <div className={classNames(
            styles.step,
            active && styles.step__active,
            done && styles.step__done,
        )}/>
    )
}

export default StepQuestion;