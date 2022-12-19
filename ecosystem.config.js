module.exports = {
    apps : [{
      name   : "jj-bot",
      script : "./index.js",
      instance_var: 'production',
      "env": {
         "APP_URL": "http://83.229.84.223:80",
         "PORT": 80,
         "NODE_ENV": "production",
         "NODE_CONFIG_DIR": "./config/"
      }
    }]
}