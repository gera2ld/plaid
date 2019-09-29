exports.escapeScript = content => content.replace(/<(\/script>)/g, '\\x3c$2');
