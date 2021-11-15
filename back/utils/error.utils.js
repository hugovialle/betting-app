/**
 * Controller for Users
 * @author Hugo Vialle
 * @date 15/11/2021
 */

module.exports.signInErrors = (err) => {
    let errors = { pseudo: '', password: ''}

    if (err.message.includes("pseudo"))
        errors.pseudo = "Le pseudo est inconnu";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas"

    return errors;
}

module.exports.addSlotErrors = (err) => {
    let errors = { date: '', time: ''}

    if (err.message.includes("date"))
        errors.email = "La date est invalide";

    if (err.message.includes('time'))
        errors.password = "Aucune horaire n'est sélectionnée"

    if (err.message.includes('duplicate'))
        errors.password = "Le créneau existe déjà"

    return errors;
}