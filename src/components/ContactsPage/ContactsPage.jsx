import React from 'react'
import styles from './ContactsPage.module.css';
// import { useContext } from 'react'
// import { ThemeContext } from '../../App'

// export const ContactsPage = () => {
//     const themeContext = useContext(ThemeContext);

//     return (
//         <div>{themeContext.theme}</div>
//     )
// }
export const ContactsPage = () => {
    // const themeContext = useContext(ThemeContext);

    return (
        <div className={styles.contactsContainer}>
            <h3 className={styles.contactsBlockHeader}>
            Контакты
            </h3>
            <ul className={styles.contactsList}>
                <li>Archibald Joseph Cronin</li>
                <li>19 July 1896</li>
                <li>Cardross, Dunbartonshire, Scotland</li>
                <li>Litt.D. from Bowdoin College</li>
                <li>8-800-555-35-35</li>
                <li>archibaldcroninscotlandwriter@fuckyou.com</li>
            </ul>
        </div>
    )
}
