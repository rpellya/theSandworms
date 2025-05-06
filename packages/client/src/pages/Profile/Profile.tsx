import { Button } from 'components/Button';
import { memo, useState } from 'react';
import style from './Profile.module.scss';
import Field from './components/field';
import { dictonariesFields } from './dictonariesFields';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { updateIconProfile } from './helpers/updateIconProfile';

/**
 * Оборачиваем в memo, чтобы при рендеринге этого компонента не перерисовывался весь дочерний контент
 */
export const Profile = memo(() => {
    const [disabled, setDisabled] = useState(true);
    const [textBtn, setTextBtn] = useState('Изменить');
    const { icon } = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();
    const updateFunc = () => {
        setDisabled(!disabled);
        disabled ? setTextBtn('Сохранить') : setTextBtn('Изменить');
    };
    return (
        <div className={style.profile}>
            <header className={style.profile_header}>
                <Link to="/" className={style.profile_header_homeBtn}>
                    To home
                </Link>
                <p className={style.profile_header_logout}>Logout</p>
            </header>
            <div className={style.profile_container}>
                <h3>Profile</h3>
                <img
                    onClick={() => updateIconProfile(dispatch)}
                    className={style.profile_container_icon}
                    src={icon}
                    alt="icon"
                />
                <form className={style.profile_container_form}>
                    <div className={style.profile_container_form_fields}>
                        {dictonariesFields.map((field) => (
                            <Field
                                fieldName={field.fieldName}
                                fieldType={field.fieldType}
                                key={field.key}
                                placeholder={field.placeholder}
                                value={field.value}
                                disabled={disabled}
                            />
                        ))}
                    </div>
                    <Button onClick={updateFunc}>{textBtn}</Button>
                </form>
            </div>
        </div>
    );
});
