/*
    krpano HTML5 Javascript Plugin Example
*/

function krpanoplugin()
{
    var local = this;   // save the 'this' pointer from the current plugin object

    var krpano = null;  // the krpano and plugin interface objects
    var plugin = null;

    // registerplugin - startup point for the plugin (required)
    // - krpanointerface = krpano interface object
    // - pluginpath = the fully qualified plugin name (e.g. "plugin[name]")
    // - pluginobject = the xml plugin object itself
    local.registerplugin = function(krpanointerface, pluginpath, pluginobject)
    {
        // get the krpano interface and the plugin object
        krpano = krpanointerface;
        plugin = pluginobject;

        // first - say hello
        // krpano.trace(1, "hello from plugin[" + plugin.name + "]");

        // add plugin attributes
        plugin.registerattribute("dataurl", "normal");

        // add plugin action (the attribute needs to be lowercase!)
        plugin.startanimation = action_startanimation;

        // optionally - add some graphical content:

        // register the size of the content
        plugin.registercontentsize(200,200);

        var lottie = document.createElement("div");
        lottie.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;text-align:center;";
        lottie.id = plugin.name;
        plugin.sprite.appendChild(lottie);
    }

    // unloadplugin - exit point for the plugin (optionally)
    // - will be called from krpano when the plugin will be removed
    // - everything that was added by the plugin should be removed here
    local.unloadplugin = function()
    {
        plugin = null;
        krpano = null;
    }

    // onresize (optionally)
    // - width,height = the new size for the plugin
    // - when not defined then only the krpano plugin html element will be sized
    local.onresize = function(width,height)
    {
        // not used in this example
        // the plugin content will resize automatically because
        // of the width=100%, height=100% CSS style
        return false;
    }


    function action_startanimation(){
        krpano.trace(1, "dataurl=" + plugin.dataurl);
        krpano.trace(1, lottie);
        var preloading = bodymovin.loadAnimation({
            container: document.getElementById(plugin.name),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: plugin.dataurl,
            name: 'anim'
          });

    }
}