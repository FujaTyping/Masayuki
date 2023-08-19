const { Precondition } = require('@sapphire/framework');
const { owner } = require('../config.json');

class OwnerOnlyPrecondition extends Precondition {
  async messageRun(message) {
    // for Message Commands
    return this.checkOwner(message.author.id);
  }

  async chatInputRun(interaction) {
    // for Slash Commands
    return this.checkOwner(interaction.user.id);
  }

  async contextMenuRun(interaction) {
    // for Context Menu Command
    return this.checkOwner(interaction.user.id);
  }

  async checkOwner(userId) {
    return owner.includes(userId)
      ? this.ok()
      : this.error({ message: '⚠ This is owner only command!' });
  }
}

/*
  constructor(context) {
    super(context, {
      // ...
      preconditions: ['OwnerOnly']
    });
  }
*/

module.exports = {
  OwnerOnlyPrecondition
};