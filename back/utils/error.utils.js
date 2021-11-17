/**
 * Controller for Users
 * @author Hugo Vialle
 * @date 15/11/2021
 */

module.exports.signInErrors = (err) => {
    let errors = { pseudo: '', password: ''}

    if (err.message.includes("pseudo"))
        errors.pseudo = "Le pseudo est inconnu";

    if (err.message.includes("password"))
        errors.password = "Le mot de passe ne correspond pas"

    return errors;
}

module.exports.addEventErrors = (err) => {
    let errors = { date: '', duplicate: ''}

    if (err.message.includes("date"))
        errors.date = "La date est invalide";

    if (err.message.includes('duplicate'))
        errors.duplicate = "L'event existe déjà"

    return errors;
}