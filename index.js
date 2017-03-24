const Slash = require('slash');
module.exports = function Contract(dispatch){
    const slash = new Slash(dispatch);
    let enabled = false;
    slash.on('contract', (args) => {
        enabled = true;
        slash.print('[contract] enabled - waiting for next contract')
    })
    dispatch.hook('sRequestContract', (event) => {
        if(!enabled) return;
        slash.print('[contract] forcing contract accept')
        dispatch.toServer('cAcceptContract', {
            type: event.type,
            id: event.id
        })
        enabled = false;
    })
}
