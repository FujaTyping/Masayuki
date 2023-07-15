const { AllFlowsPrecondition } = require('@sapphire/framework');
const { owners } = require('../config.json');

class UserPrecondition extends AllFlowsPrecondition {
    #message = '⚠ This command use by ONWERS only!';

    chatInputRun(interaction) {
        return this.doOwnerCheck(interaction.user.id);
    }

    contextMenuRun(interaction) {
        return this.doOwnerCheck(interaction.user.id);
    }

    messageRun(message) {
        return this.doOwnerCheck(message.author.id);
    }

    doOwnerCheck(userId) {
        return owners.includes(userId) ? this.ok() : this.error({ message: this.#message });
    }
}

/*
    HOW TO USE
    Just add this line of code in commands file at

    constructor(context, options) {
        preconditions: ['OwnerOnly']
    }
*/

module.exports = {
    UserPrecondition
};