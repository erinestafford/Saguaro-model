"use strict";
/**
* @preserve
* ForeSee Gateway Script v2.0.2-v.3. Thursday, March 16th, 2017, 12:24:00 PM
* (c) Copyright 2016, ForeSee. http://www.foresee.com
* Patents pending.
**/
!function(){function trimDots(ary){var i,part;for(i=0;i<ary.length;i++)if(part=ary[i],"."===part)ary.splice(i,1),i-=1;else if(".."===part){if(0===i||1==i&&".."===ary[2]||".."===ary[i-1])continue;i>0&&(ary.splice(i-1,2),i-=2)}}function __eB(element,type,handler){element.addEventListener?element.addEventListener(type,handler,!1):element.attachEvent("on"+type,handler)}function getAllScripts(){return _D.getElementsByTagName("script")}function mixin(target,source,force,deepStringMixin){return source&&eachProp(source,function(value,prop){!force&&hasProp(target,prop)||(!deepStringMixin||"object"!=typeof value||!value||isArray(value)||isFunction(value)||value instanceof RegExp?target[prop]=value:(target[prop]||(target[prop]={}),mixin(target[prop],value,force,deepStringMixin)))}),target}function each(ary,func){if(ary){var i;for(i=0;i<ary.length&&(!ary[i]||!func(ary[i],i,ary));i+=1);}}function eachReverse(ary,func){if(ary){var i;for(i=ary.length-1;i>-1&&(!ary[i]||!func(ary[i],i,ary));i-=1);}}function defaultOnError(err){}function getGlobal(value){if(!value)return value;var g=global;return each(value.split("."),function(part){g=g[part]}),g}function newContext(contextName){function normalize(name,baseName,applyMap){var pkgMain,mapValue,nameParts,i,j,nameSegment,lastIndex,foundMap,foundI,foundStarMap,starI,normalizedBaseParts,baseParts=baseName&&baseName.split("/"),map=config.map,starMap=map&&map["*"];if(name&&(name=name.split("/"),lastIndex=name.length-1,config.nodeIdCompat&&jsSuffixRegExp.test(name[lastIndex])&&(name[lastIndex]=name[lastIndex].replace(jsSuffixRegExp,"")),"."===name[0].charAt(0)&&baseParts&&(normalizedBaseParts=baseParts.slice(0,baseParts.length-1),name=normalizedBaseParts.concat(name)),trimDots(name),name=name.join("/")),applyMap&&map&&(baseParts||starMap)){nameParts=name.split("/");outerLoop:for(i=nameParts.length;i>0;i-=1){if(nameSegment=nameParts.slice(0,i).join("/"),baseParts)for(j=baseParts.length;j>0;j-=1)if(mapValue=getOwn(map,baseParts.slice(0,j).join("/")),mapValue&&(mapValue=getOwn(mapValue,nameSegment))){foundMap=mapValue,foundI=i;break outerLoop}!foundStarMap&&starMap&&getOwn(starMap,nameSegment)&&(foundStarMap=getOwn(starMap,nameSegment),starI=i)}!foundMap&&foundStarMap&&(foundMap=foundStarMap,foundI=starI),foundMap&&(nameParts.splice(0,foundI,foundMap),name=nameParts.join("/"))}return pkgMain=getOwn(config.pkgs,name),pkgMain?pkgMain:name}function removeScript(name){each(getAllScripts(),function(scriptNode){if(attr(scriptNode,"data-requiremodule")===name&&attr(scriptNode,"data-requirecontext")===context.contextName)return scriptNode.parentNode.removeChild(scriptNode),!0})}function hasPathFallback(id){var pathConfig=getOwn(config.paths,id);if(pathConfig&&isArray(pathConfig)&&pathConfig.length>1)return pathConfig.shift(),context.require.undef(id),context.makeRequire(null,{skipMap:!0})([id]),!0}function splitPrefix(name){var prefix,index=name?name.indexOf("!"):-1;return index>-1&&(prefix=name.substring(0,index),name=name.substring(index+1,name.length)),[prefix,name]}function makeModuleMap(name,parentModuleMap,isNormalized,applyMap){var url,pluginModule,suffix,nameParts,prefix=null,parentName=parentModuleMap?parentModuleMap.name:null,originalName=name,isDefine=!0,normalizedName="";return name||(isDefine=!1,name="_@r"+(requireCounter+=1)),nameParts=splitPrefix(name),prefix=nameParts[0],name=nameParts[1],prefix&&(prefix=normalize(prefix,parentName,applyMap),pluginModule=getOwn(defined,prefix)),name&&(prefix?normalizedName=pluginModule&&pluginModule.normalize?pluginModule.normalize(name,function(name){return normalize(name,parentName,applyMap)}):name.indexOf("!")===-1?normalize(name,parentName,applyMap):name:(normalizedName=normalize(name,parentName,applyMap),nameParts=splitPrefix(normalizedName),prefix=nameParts[0],normalizedName=nameParts[1],isNormalized=!0,url=context.nameToUrl(normalizedName))),suffix=!prefix||pluginModule||isNormalized?"":"_unnormalized"+(unnormalizedCounter+=1),{prefix:prefix,name:normalizedName,parentMap:parentModuleMap,unnormalized:!!suffix,url:url,originalName:originalName,isDefine:isDefine,id:(prefix?prefix+"!"+normalizedName:normalizedName)+suffix}}function getModule(depMap){var id=depMap.id,mod=getOwn(registry,id);return mod||(mod=registry[id]=new context.Module(depMap)),mod}function on(depMap,name,fn){var id=depMap.id,mod=getOwn(registry,id);!hasProp(defined,id)||mod&&!mod.defineEmitComplete?(mod=getModule(depMap),mod.error&&"error"===name?fn(mod.error):mod.on(name,fn)):"defined"===name&&fn(defined[id])}function onError(err,errback){err.requireModules;errback&&errback(err)}function takeGlobalQueue(){globalDefQueue.length&&(apsp.apply(defQueue,[defQueue.length,0].concat(globalDefQueue)),globalDefQueue=[])}function cleanRegistry(id){delete registry[id],delete enabledRegistry[id]}function breakCycle(mod,traced,processed){var id=mod.map.id;mod.error?mod.emit("error",mod.error):(traced[id]=!0,each(mod.depMaps,function(depMap,i){var depId=depMap.id,dep=getOwn(registry,depId);!dep||mod.depMatched[i]||processed[depId]||(getOwn(traced,depId)?(mod.defineDep(i,defined[depId]),mod.check()):breakCycle(dep,traced,processed))}),processed[id]=!0)}function checkLoaded(){var usingPathFallback,waitInterval=1e3*config.waitSeconds,expired=waitInterval&&context.startTime+waitInterval<(new Date).getTime(),noLoads=[],reqCalls=[],stillLoading=!1,needCycleCheck=!0;inCheckLoaded||(inCheckLoaded=!0,eachProp(enabledRegistry,function(mod){var map=mod.map,modId=map.id;if(mod.enabled&&(map.isDefine||reqCalls.push(mod),!mod.error))if(!mod.inited&&expired)hasPathFallback(modId)?(usingPathFallback=!0,stillLoading=!0):(noLoads.push(modId),removeScript(modId));else if(!mod.inited&&mod.fetched&&map.isDefine&&(stillLoading=!0,!map.prefix))return needCycleCheck=!1}),expired&&noLoads.length||(needCycleCheck&&each(reqCalls,function(mod){breakCycle(mod,{},{})}),expired&&!usingPathFallback||!stillLoading||checkLoadedTimeoutId||(checkLoadedTimeoutId=setTimeout(function(){checkLoadedTimeoutId=0,checkLoaded()},50)),inCheckLoaded=!1))}function callGetModule(args){hasProp(defined,args[0])||getModule(makeModuleMap(args[0],null,!0)).init(args[1],args[2])}function removeListener(node,func,name,ieName){node.detachEvent&&!isOpera?ieName&&node.detachEvent(ieName,func):node.removeEventListener(name,func,!1)}function getScriptData(evt){var node=evt.currentTarget||evt.srcElement;return removeListener(node,context.onScriptLoad,"load","onreadystatechange"),removeListener(node,context.onScriptError,"error"),{node:node,id:node&&attr(node,"data-requiremodule")}}function intakeDefines(){var args;for(takeGlobalQueue();defQueue.length;){if(args=defQueue.shift(),null===args[0])return;callGetModule(args)}}var inCheckLoaded,Module,context,handlers,checkLoadedTimeoutId,config={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},registry={},enabledRegistry={},undefEvents={},defQueue=[],defined={},urlFetched={},bundlesMap={},requireCounter=1,unnormalizedCounter=1;return handlers={require:function(mod){return mod.require?mod.require:mod.require=context.makeRequire(mod.map)},exports:function(mod){if(mod.usingExports=!0,mod.map.isDefine)return mod.exports?defined[mod.map.id]=mod.exports:mod.exports=defined[mod.map.id]={}},module:function(mod){return mod.module?mod.module:mod.module={id:mod.map.id,uri:mod.map.url,config:function(){return getOwn(config.config,mod.map.id)||{}},exports:mod.exports||(mod.exports={})}}},Module=function(map){this.events=getOwn(undefEvents,map.id)||{},this.map=map,this.shim=getOwn(config.shim,map.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},Module.prototype={init:function(depMaps,factory,errback,options){options=options||{},this.inited||(this.factory=factory,errback?this.on("error",errback):this.events.error&&(errback=proxy(function(err){this.emit("error",err)},this)),this.depMaps=depMaps&&depMaps.slice(0),this.errback=errback,this.inited=!0,this.ignore=options.ignore,options.enabled||this.enabled?this.enable():this.check())},defineDep:function(i,depExports){this.depMatched[i]||(this.depMatched[i]=!0,this.depCount-=1,this.depExports[i]=depExports)},fetch:function(){if(!this.fetched){this.fetched=!0,context.startTime=(new Date).getTime();var map=this.map;return this.shim?void context.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],proxy(function(){return map.prefix?this.callPlugin():this.load()},this)):map.prefix?this.callPlugin():this.load()}},load:function(){var url=this.map.url;urlFetched[url]||(urlFetched[url]=!0,context.load(this.map.id,url))},check:function(){if(this.enabled&&!this.enabling){var err,cjsModule,id=this.map.id,depExports=this.depExports,exports=this.exports,factory=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(factory)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{exports=context.execCb(id,factory,depExports,exports)}catch(e){err=e}else exports=context.execCb(id,factory,depExports,exports);if(this.map.isDefine&&void 0===exports&&(cjsModule=this.module,cjsModule?exports=cjsModule.exports:this.usingExports&&(exports=this.exports)),err)return err.requireMap=this.map,err.requireModules=this.map.isDefine?[this.map.id]:null,err.requireType=this.map.isDefine?"define":"require",onError(this.error=err)}else exports=factory;this.exports=exports,this.map.isDefine&&!this.ignore&&(defined[id]=exports,req.onResourceLoad&&req.onResourceLoad(context,this.map,this.depMaps)),cleanRegistry(id),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var map=this.map,id=map.id,pluginMap=makeModuleMap(map.prefix);this.depMaps.push(pluginMap),on(pluginMap,"defined",proxy(function(plugin){var load,normalizedMap,normalizedMod,bundleId=getOwn(bundlesMap,this.map.id),name=this.map.name,parentName=this.map.parentMap?this.map.parentMap.name:null,localRequire=context.makeRequire(map.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(plugin.normalize&&(name=plugin.normalize(name,function(name){return normalize(name,parentName,!0)})||""),normalizedMap=makeModuleMap(map.prefix+"!"+name,this.map.parentMap),on(normalizedMap,"defined",proxy(function(value){this.init([],function(){return value},null,{enabled:!0,ignore:!0})},this)),normalizedMod=getOwn(registry,normalizedMap.id),void(normalizedMod&&(this.depMaps.push(normalizedMap),this.events.error&&normalizedMod.on("error",proxy(function(err){this.emit("error",err)},this)),normalizedMod.enable()))):bundleId?(this.map.url=context.nameToUrl(bundleId),void this.load()):(load=proxy(function(value){this.init([],function(){return value},null,{enabled:!0})},this),load.error=proxy(function(err){this.inited=!0,this.error=err,err.requireModules=[id],eachProp(registry,function(mod){0===mod.map.id.indexOf(id+"_unnormalized")&&cleanRegistry(mod.map.id)}),onError(err)},this),load.fromText=proxy(function(text,textAlt){var moduleName=map.name,moduleMap=makeModuleMap(moduleName),hasInteractive=useInteractive;textAlt&&(text=textAlt),hasInteractive&&(useInteractive=!1),getModule(moduleMap),hasProp(config.config,id)&&(config.config[moduleName]=config.config[id]);try{req.exec(text)}catch(e){return}hasInteractive&&(useInteractive=!0),this.depMaps.push(moduleMap),context.completeLoad(moduleName),localRequire([moduleName],load)},this),void plugin.load(map.name,localRequire,load,config))},this)),context.enable(pluginMap,this),this.pluginMaps[pluginMap.id]=pluginMap},enable:function(){enabledRegistry[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,proxy(function(depMap,i){var id,mod,handler;if("string"==typeof depMap){if(depMap=makeModuleMap(depMap,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[i]=depMap,handler=getOwn(handlers,depMap.id))return void(this.depExports[i]=handler(this));this.depCount+=1,on(depMap,"defined",proxy(function(depExports){this.defineDep(i,depExports),this.check()},this)),this.errback&&on(depMap,"error",proxy(this.errback,this))}id=depMap.id,mod=registry[id],hasProp(handlers,id)||!mod||mod.enabled||context.enable(depMap,this)},this)),eachProp(this.pluginMaps,proxy(this,function(pluginMap){var mod=getOwn(registry,pluginMap.id);mod&&!mod.enabled&&context.enable(pluginMap,this)},this)),this.enabling=!1,this.check()},on:function(name,cb){var cbs=this.events[name];cbs||(cbs=this.events[name]=[]),cbs.push(cb)},emit:function(name,evt){each(this.events[name],function(cb){cb(evt)}),"error"===name&&delete this.events[name]}},context={config:config,contextName:contextName,registry:registry,defined:defined,urlFetched:urlFetched,defQueue:defQueue,Module:Module,makeModuleMap:makeModuleMap,nextTick:req.nextTick,onError:onError,configure:function(cfg){cfg.baseUrl&&"/"!==cfg.baseUrl.charAt(cfg.baseUrl.length-1)&&(cfg.baseUrl+="/");var shim=config.shim,objs={paths:!0,bundles:!0,config:!0,map:!0};eachProp(cfg,function(value,prop){objs[prop]?(config[prop]||(config[prop]={}),mixin(config[prop],value,!0,!0)):config[prop]=value}),cfg.bundles&&eachProp(cfg.bundles,function(value,prop){each(value,function(v){v!==prop&&(bundlesMap[v]=prop)})}),cfg.shim&&(eachProp(cfg.shim,function(value,id){isArray(value)&&(value={deps:value}),!value.exports&&!value.init||value.exportsFn||(value.exportsFn=context.makeShimExports(value)),shim[id]=value}),config.shim=shim),cfg.packages&&each(cfg.packages,function(pkgObj){var location,name;pkgObj="string"==typeof pkgObj?{name:pkgObj}:pkgObj,name=pkgObj.name,location=pkgObj.location,location&&(config.paths[name]=pkgObj.location),config.pkgs[name]=pkgObj.name+"/"+(pkgObj.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(registry,function(mod,id){mod.inited||mod.map.unnormalized||(mod.map=makeModuleMap(id))}),(cfg.deps||cfg.callback)&&context.require(cfg.deps||[],cfg.callback)},makeShimExports:function(value){function fn(){var ret;return value.init&&(ret=value.init.apply(global,arguments)),ret||value.exports&&getGlobal(value.exports)}return fn},makeRequire:function(relMap,options){function localRequire(deps,callback,errback){var id,map,requireMod;if(options.enableBuildCallback&&callback&&isFunction(callback)&&(callback.__requireJsBuild=!0),"string"==typeof deps){if(isFunction(callback))return;if(relMap&&hasProp(handlers,deps))return handlers[deps](registry[relMap.id]);if(req.get)return req.get(context,deps,relMap,localRequire);if(map=makeModuleMap(deps,relMap,!1,!0),id=map.id,!hasProp(defined,id))return;return defined[id]}return intakeDefines(),context.nextTick(function(){intakeDefines(),requireMod=getModule(makeModuleMap(null,relMap)),requireMod.skipMap=options.skipMap,requireMod.init(deps,callback,errback,{enabled:!0}),checkLoaded()}),localRequire}return options=options||{},mixin(localRequire,{toUrl:function(moduleNamePlusExt){var ext,index=moduleNamePlusExt.lastIndexOf("."),segment=moduleNamePlusExt.split("/")[0],isRelative="."===segment||".."===segment;return index!==-1&&(!isRelative||index>1)&&(ext=moduleNamePlusExt.substring(index,moduleNamePlusExt.length),moduleNamePlusExt=moduleNamePlusExt.substring(0,index)),context.nameToUrl(normalize(moduleNamePlusExt,relMap&&relMap.id,!0),ext,!0)},defined:function(id){return hasProp(defined,makeModuleMap(id,relMap,!1,!0).id)},specified:function(id){return id=makeModuleMap(id,relMap,!1,!0).id,hasProp(defined,id)||hasProp(registry,id)}}),relMap||(localRequire.undef=function(id){takeGlobalQueue();var map=makeModuleMap(id,relMap,!0),mod=getOwn(registry,id);removeScript(id),delete defined[id],delete urlFetched[map.url],delete undefEvents[id],eachReverse(defQueue,function(args,i){args[0]===id&&defQueue.splice(i,1)}),mod&&(mod.events.defined&&(undefEvents[id]=mod.events),cleanRegistry(id))}),localRequire},enable:function(depMap){var mod=getOwn(registry,depMap.id);mod&&getModule(depMap).enable()},completeLoad:function(moduleName){var found,args,mod,shim=getOwn(config.shim,moduleName)||{},shExports=shim.exports;for(takeGlobalQueue();defQueue.length;){if(args=defQueue.shift(),null===args[0]){if(args[0]=moduleName,found)break;found=!0}else args[0]===moduleName&&(found=!0);callGetModule(args)}if(mod=getOwn(registry,moduleName),!found&&!hasProp(defined,moduleName)&&mod&&!mod.inited){if(!(!config.enforceDefine||shExports&&getGlobal(shExports)))return hasPathFallback(moduleName),void 0;callGetModule([moduleName,shim.deps||[],shim.exportsFn])}checkLoaded()},nameToUrl:function(moduleName,ext,skipExt){var paths,syms,i,parentModule,url,parentPath,bundleId,pkgMain=getOwn(config.pkgs,moduleName);if(pkgMain&&(moduleName=pkgMain),bundleId=getOwn(bundlesMap,moduleName))return context.nameToUrl(bundleId,ext,skipExt);if(req.jsExtRegExp.test(moduleName))url=moduleName+(ext||"");else{for(paths=config.paths,syms=moduleName.split("/"),i=syms.length;i>0;i-=1)if(parentModule=syms.slice(0,i).join("/"),parentPath=getOwn(paths,parentModule)){isArray(parentPath)&&(parentPath=parentPath[0]),syms.splice(0,i,parentPath);break}url=syms.join("/"),url+=ext||(/^data\:|\?/.test(url)||skipExt?"":".js"),url=("/"===url.charAt(0)||url.match(/^[\w\+\.\-]+:/)?"":config.baseUrl)+url}return config.urlArgs?url+((url.indexOf("?")===-1?"?":"&")+config.urlArgs):url},load:function(id,url){req.load(context,id,url)},execCb:function(name,callback,args,exports){return callback.apply(exports,args)},onScriptLoad:function(evt){if("load"===evt.type||readyRegExp.test((evt.currentTarget||evt.srcElement).readyState)){interactiveScript=null;var data=getScriptData(evt);context.completeLoad(data.id)}},onScriptError:function(evt){var data=getScriptData(evt);!hasPathFallback(data.id)}},context.require=context.makeRequire(),context}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(getAllScripts(),function(script){if("interactive"===script.readyState)return interactiveScript=script}),interactiveScript)}function subtractFromURL(base,notches){var pref=base.substr(0,base.indexOf("//"))+"//",suff=base.substr(pref.length),dom=suff.substr(suff.indexOf("/")+1),tail=dom.substr(dom.lastIndexOf("/")+1);dom=dom.substr(0,dom.length-tail.length-1),suff=suff.substr(0,suff.indexOf("/"));var bits=dom.split("/");return bits.length-=Math.min(bits.length,notches),(pref+suff+"/"+bits.join("/")+tail).replace(/\/\/\//g,"//")}var _moduleLocationOverride,_W=window,_D=_W.document,supportsDomStorage=!!_W.sessionStorage,skipInit=!1,_HD=_D.getElementsByTagName("head"),isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString();if(!isOpera){_HD=_HD&&_HD.length>0?_HD[0]:_D.body;try{supportsDomStorage&&sessionStorage.setItem("_","")}catch(e){supportsDomStorage=!1}var globalConfig={},productConfig={};
globalConfig = {"codeVer":"19.3.0","products":{},"storage":"COOKIE","brainUrl":"https://brain.foresee.com","recUrl":"https://rec.replay.answerscloud.com/rec/","surveyUrl":"https://survey.foreseeresults.com/survey/display","analyticsUrl":"https://analytics.foresee.com/ingest/events","staticUrl":"https://static.foresee.com","alwaysOnLatest":0};

productConfig = {};
productConfig.trigger = ({

  /**
   * Describes whether this module is to be used or not. Can be a function that returns a boolean
   * or it can just be a boolean.
   */
  "check": function() {
    // This next line is where all the properties and survey defs are inserted.
    var config, triggerconfig, t, o, s, recconfig, surveydefs;

    config = {
      version: "19.0.33",
      id: "VkERNMYgs5wllZ0khFwkEA==",
      site_id: "epa.gov",
      surveyUrl: "https://survey.foreseeresults.com/survey/display",
      brainUrl: "https://brain.foresee.com",
      persistence: "PERSISTENT",
      triggerDelay: 0,
      inviteDelay: 0,
      repeatDays: {
        decline: 90,
        accept: 90
      },
      trackerConvertsAfter: 1e4,
      trackerHeartbeatTimeout: 1e4,
      trackerHeartbeatLongTimeout: 6e3,
      onExitMobileHeartbeatInterval: 6e4,
      reinviteDelayAfterInviteAbandon: 7776e6,
      workInIframes: "dontRunOtherIframes",
      ignoreNavigationEvents: !1,
      globalExclude: {
        urls: [],
        referrers: [],
        userAgents: [],
        browsers: [],
        cookies: [],
        variables: []
      },
      inviteExclude: {
        urls: ["indrasoft", "induscorp", "intranet", "owstgauthor", "staging", "wcmsprd"],
        referrers: [],
        userAgents: [],
        browsers: [],
        cookies: [],
        variables: []
      },
      sites: [{
        path: /\w+-?\w+\.(com|org|edu|gov|net|co\.uk)/
      }, {
        path: ".",
        domain: "default"
      }],
      events: {
        loaded: function() {},
        initialized: function(e) {},
        inviteShown: function(e, t, o, i) {},
        inviteAccepted: function(e, t, o, i) {},
        inviteDeclined: function(e, t, o, i) {},
        trackerShown: function(e, t, o, i) {}
      },
      browser_cutoff: {
        IE: 8,
        Safari: 5.1,
        Firefox: 11,
        Chrome: 20,
        Opera: 1e3
      },
      platform_cutoff: {
        Android: 4.1,
        Winphone: 8,
        iPod: 7,
        iPhone: 7,
        iPad: 7
      },
      device_blacklist: ["HTC_Rezound", "blackberry"],
      replay_pools: [{
        path: ".",
        sp: 100
      }],
      replay_repools: [],
      cpps: {
        VisitorID: {
          source: "variable",
          name: "epaGA_gaVisitorID"
        },
        section_www2: {
          source: "url",
          init: "N",
          patterns: [{
            regex: "www2.epa.gov",
            value: "Y"
          }]
        },
        section_www: {
          source: "url",
          init: "N",
          patterns: [{
            regex: "www.epa.gov",
            value: "Y"
          }]
        },
        nlquery: {
          source: "url",
          init: "N",
          patterns: [{
            regex: "nlquery.epa.gov",
            value: "Y"
          }]
        },
        SearchTerms: {
          source: "parameter",
          name: "querytext"
        },
        isProSearch: {
          source: "parameter",
          name: "collection",
          init: "notPro"
        },
        GA_UID: {
          source: "function",
          value: function() {
            var e = "";
            return "undefined" != typeof ga && null != ga && "undefined" != typeof ga.getAll()[0] && null != ga.getAll()[0] && (e += ga.getAll()[0].get("clientId")), e
          }
        }
      }
    };
    surveydefs = [{
      name: "browse",
      language: {
        locale: "en"
      },
      cxRecord: !1,
      criteria: {
        sp: {
          reg: 100,
          outreplaypool: 100
        },
        lf: 4,
        supportsSmartPhones: !1,
        supportsTablets: !1,
        supportsDesktop: !0
      },
      include: {
        urls: ["."],
        referrers: [],
        userAgents: [],
        browsers: [],
        cookies: [],
        variables: []
      },
      inviteExclude: {
        urls: [],
        referrers: [],
        userAgents: [],
        browsers: [],
        cookies: [],
        variables: []
      },
      pattern: "url",
      selectMode: "default",
      links: {
        cancel: [],
        survey: [],
        tracker: []
      },
      display: {
        desktop: [{
          displayname: "default",
          template: "classicdesktop",
          inviteLogo: "sitelogo.png",
          trackerLogo: "sitelogo.png",
          siteLogoAlt: "My Site.com!",
          vendorLogo: "fslogo.svg",
          vendorLogoPNG: "fslogo.png",
          vendorAltText: "ForeSee",
          trusteLogo: "seal.gif",
          trusteLogoAltText: "Validate TRUSTe Privacy Certification",
          inviteType: "TRACKER",
          closeClickOnBackdrop: !0,
          removeSurveyAlerts: !1,
          dialog: {
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback",
            acceptButtonTitleText: "Yes, I'll give feedback (Opens in a new window)",
            error: "Error",
            warnLaunch: "this will launch a new window",
            allowclose: !0,
            surveyavailable: "Your survey is now available",
            trackerTitle: "ForeSee - Survey Tracker Window",
            trackerClickToView: "Click to view the survey.",
            trackerPlsLeaveOpen: "Please leave this window open.",
            trackerAtEnd: "At the end of your session, click here to begin the survey.",
            trackerDesc1: "It is part of the customer satisfaction survey you agreed to take on this site. You may click here when ready to complete the survey, although it should activate on its own after a few moments when you have left the site.",
            trackerDesc2: "Please leave this window open until you have completed your time on this site. This window is part of the customer satisfaction survey you agreed to take on this site. You may click here when ready to complete the survey, although it should activate on its own after a few moments when you have left the site.",
            trackerDesc3: "Thank you for helping us improve your website experience. This survey is conducted by an independent company, ForeSee, on behalf of the site you visited.",
            trackerCorp: "ForeSee, an Answers company. All rights reserved.",
            trackerPrivacy: "Privacy",
            onexitheadline: "Thank you for helping!",
            onexitblurb: "Please provide your email address or mobile number (US and CA only). After your visit we'll send you a link to the survey. Text Messaging rates apply.",
            onexitattribution: "ForeSee's <a class='fsrPrivacy' href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a>",
            onexitdeclineButton: "Cancel",
            onexitacceptButton: "email/text me",
            onexiterror: "Error",
            onexitallowclose: !1,
            onexitsupport: "b",
            onexitinputMessage: "Email or mobile number",
            onexitinputMessageJustMobile: "Mobile number",
            onexitinputMessageJustEmail: "Email address",
            onexitemailMeButtonText: "Email me",
            onexittextMeButtonText: "Text me",
            onexitinvalidemailtext: "Format should be: name@domain.com",
            onexitinvalidsmstext: "Format should be: 123-456-7890",
            onexitinvalidFormatErrorText: "Format should be: name@domain.com or 123-456-7890"
          }
        }],
        mobile: [{
          displayname: "default",
          template: "classicmobile",
          inviteLogo: "sitelogo.png",
          trackerLogo: "sitelogo.png",
          siteLogoAlt: "My Site.com!",
          vendorLogo: "fslogo.svg",
          vendorLogoPNG: "fslogo.png",
          vendorAltText: "ForeSee",
          trusteLogo: "seal.gif",
          trusteLogoAltText: "Validate TRUSTe Privacy Certification",
          inviteType: "SMSEMAIL",
          dialog: {
            headline: "We'd welcome your feedback!",
            blurb: "Can we email or text you later a brief customer satisfaction survey so we can improve your mobile experience?",
            attribution: "Conducted by ForeSee.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll help",
            surveyavailable: "Your survey is now available",
            onexitheadline: "Thank you for helping!",
            onexitblurb: "Please provide your email address or mobile number (US and CA only). After your visit we'll send you a link to the survey. Text Messaging rates apply.",
            onexitattribution: "ForeSee's <a class='fsrPrivacy' href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a>",
            onexitdeclineButton: "Cancel",
            onexitacceptButton: "email/text me",
            onexiterror: "Error",
            onexitallowclose: !1,
            onexitsupport: "b",
            onexitinputMessage: "Email or mobile number",
            onexitinputMessageJustMobile: "Mobile number",
            onexitinputMessageJustEmail: "Email address",
            onexitemailMeButtonText: "Email me",
            onexittextMeButtonText: "Text me",
            onexitinvalidemailtext: "Format should be: name@domain.com",
            onexitinvalidsmstext: "Format should be: 123-456-7890",
            onexitinvalidFormatErrorText: "Format should be: name@domain.com or 123-456-7890"
          }
        }]
      }
    }];


    if (config) {
      triggerconfig = config;
    } else {
      config = triggerconfig;
    }

    _W._fsDefine("triggerconfig", function() {
      return {
        config: triggerconfig,
        surveydefs: surveydefs
      };
    });

    if (recconfig) {
      _W._fsDefine("recordconfig", function() {
        return recconfig;
      });
    }

    // Unless you are turning everything OFF, leave all this stuff alone:
    if (fsCmd("fstest")) {
      // Loads the fsradmin page, load trigger project to be able to register the product.
      this["dependencies"] = ["trigger/fs.utils.js", "trigger/fs.svadmin.js"];
    } else if (fsCmd("fsoptout")) {
      // Loads the opt-out interface
      this["dependencies"] = ["trigger/fs.utils.js", "trigger/fs.optout.js"];
    } else if (triggerconfig.hasReplay == "true") {
      if (!productConfig.record) {
        triggerconfig.hasReplay = "false";
      } else {
        // Add the recorder so it's preloaded and ready to go
        this["dependencies"].push("trigger/fs.record.js");
      }
    }

    // If you want to turn things off, then set this to false instead of true
    return true;
  },

  /**
   * The dependencies to load
   */
  "dependencies": ["trigger/fs.utils.js", "trigger/fs.trigger.js"]
});
if("undefined"==typeof _W._fsDefine&&JSON&&!(document.documentMode<8)){var stg=function(){};stg.prototype.has=function(itm){return null!==this.get(itm)},stg.prototype.get=function(itm){var res=null;return supportsDomStorage&&(res=localStorage.getItem(itm),res||(res=sessionStorage.getItem(itm))),res},stg.prototype.set=function(itm,val){if(supportsDomStorage)try{localStorage.setItem(itm,val.toString())}catch(e){try{sessionStorage.setItem(itm,val.toString())}catch(e){}}};var require,define,req,s,head,baseElement,interactiveScript,currentlyAddingScript,op=Object.prototype,hasOwn=(op.toString,op.hasOwnProperty),ap=Array.prototype,hasProp=function(obj,prop){return hasOwn.call(obj,prop)},getOwn=function(obj,prop){return hasProp(obj,prop)&&obj[prop]},eachProp=function(obj,func){var prop;for(prop in obj)if(hasProp(obj,prop)&&func(obj[prop],prop))break},isDefined=function(obj){return null!==obj&&"undefined"!=typeof obj},isFunction=function(obj){return"function"==typeof obj},isObject=function(obj){return"object"==typeof obj},isArray=function(obj){return"[object Array]"==Object.prototype.toString.call(obj)},isDate=function(obj){return obj instanceof Date},isString=function(obj){return"string"==typeof obj},isPlainObject=function(obj){if(!obj||"[object Object]"!==Object.prototype.toString.call(obj)||obj.nodeType||obj.setInterval)return!1;if(obj.constructor&&!hasOwnProperty.call(obj,"constructor")&&!hasOwnProperty.call(obj.constructor.prototype,"isPrototypeOf"))return!1;var key;for(key in obj);return void 0===key||hasOwnProperty.call(obj,key)||!hasOwnProperty.call(obj,key)&&hasOwnProperty.call(Object.prototype,key)},proxy=function(func,context){var args,bound,nativeBind=Function.prototype.bind,slice=Array.prototype.slice;return nativeBind&&func.bind===nativeBind?nativeBind.apply(func,slice.call(arguments,1)):(args=slice.call(arguments,2),bound=function(){if(!(this instanceof bound))return func.apply(context,args.concat(slice.call(arguments)));ctor.prototype=func.prototype;var self=ctor();ctor.prototype=null;var result=func.apply(self,args.concat(slice.call(arguments)));return Object(result)===result?result:self})},dispose=function(obj){if(obj){if(obj.length)for(var i=obj.length-1;i>=0;i--)obj[i]=null;for(var prop in obj){var tob=typeof obj[prop];"function"!=tob&&"object"!=tob||(obj[prop]=null)}}obj=null},getParam=function(parm){var vars={},vrl=(_W.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){vars[key]=value}),vars[parm]);return vrl?decodeURIComponent(vrl):vrl},nextTick=function(cb){setTimeout(cb||function(){},20)},ext=function(){var options,name,copy,a=arguments,target=a[0]||{},i=1,lnt=a.length,surface=arguments[arguments.length-1]===!1;for("object"==typeof target||isFunction(target)||(target={}),lnt===i&&(target=this,--i);i<lnt;i++)if(isDefined(options=a[i]))for(name in options)copy=options[name],target!==copy&&void 0!==copy&&(isArray(copy)?copy=copy.slice(0):isDate(copy)?copy=new Date(copy.getTime()):"object"!=typeof copy||surface||(copy=ext({},copy)),target[name]=copy);return target},attr=function(elm,atr,val){return isDefined(val)&&elm.setAttribute(atr,val),elm?elm.getAttribute(atr):null},toQueryString=function(params,base){var pm,pList=isDefined(base)?base+(base.indexOf("?")>-1?"&":"?"):"";if(params)for(var nm in params)pm=params[nm],isString(pm)||(pm=JSON.stringify(pm)),pList+=encodeURIComponent(nm)+"="+encodeURIComponent(pm)+"&";return pList},compute=function(vstr){var f=new[].constructor.constructor(vstr);return f.call(_W)},winload=function(cb){"complete"===_D.readyState?nextTick(cb):__eB(_W,"load",cb)},ap=Array.prototype,apsp=ap.splice,global=_W,readyRegExp="PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,contexts={},cfg={},globalDefQueue=[],useInteractive=!1;req=function(deps,callback,errback,optional){var context,config,contextName=defContextName;return isArray(deps)||"string"==typeof deps||(config=deps,isArray(callback)?(deps=callback,callback=errback,errback=optional):deps=[]),config&&config.context&&(contextName=config.context),context=getOwn(contexts,contextName),context||(context=contexts[contextName]=req.s.newContext(contextName)),config&&context.configure(config),context.require(deps,callback,errback)},req.config=function(config){return req(config)},req.nextTick="undefined"!=typeof setTimeout?function(fn){setTimeout(fn,4)}:function(fn){fn()},require=req,req.jsExtRegExp=/^\/|:|\?|\.js$/,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(prop){req[prop]=function(){var ctx=contexts[defContextName];return ctx.require[prop].apply(ctx,arguments)}}),head=s.head=_HD,baseElement=_D.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode),req.onError=defaultOnError,req.createNode=function(config,moduleName,url){var node=config.xhtml?_D.createElementNS("http://www.w3.org/1999/xhtml","html:script"):_D.createElement("script");return node.type=config.scriptType||"text/javascript",node.charset="utf-8",node.async=!0,node},req.load=function(context,moduleName,url){var node,config=context&&context.config||{};return node=req.createNode(config,moduleName,url),node.setAttribute("data-requirecontext",context.contextName),node.setAttribute("data-requiremodule",moduleName),!node.attachEvent||node.attachEvent.toString&&node.attachEvent.toString().indexOf("[native code")<0||isOpera?(node.addEventListener("load",context.onScriptLoad,!1),node.addEventListener("error",context.onScriptError,!1)):(useInteractive=!0,node.attachEvent("onreadystatechange",context.onScriptLoad)),node.src=url,currentlyAddingScript=node,baseElement?head.insertBefore(node,baseElement):head.appendChild(node),currentlyAddingScript=null,node},define=function(name,deps,callback){var node,context;"string"!=typeof name&&(callback=deps,deps=name,name=null),isArray(deps)||(callback=deps,deps=null),!deps&&isFunction(callback)&&(deps=[],callback.length&&callback.toString&&(callback.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(match,dep){deps.push(dep)}),deps=(1===callback.length?["require"]:["require","exports","module"]).concat(deps))),useInteractive&&(node=currentlyAddingScript||getInteractiveScript(),node&&(name||(name=attr(node,"data-requiremodule")),context=contexts[attr(node,"data-requirecontext")])),(context?context.defQueue:globalDefQueue).push([name,deps,callback])},req.exec=function(text){return new Function(text)()},req(cfg),_W._fsDefine=_W._acsDefine=define,_W._fsRequire=_W._acsRequire=require;var API={_enforceGlobalNS:function(){_W.FSR||(_W.FSR={}),_W.FSFB||(_W.FSFB={})},expose:function(name,obj){API._enforceGlobalNS(),_W.FSR[name]=_W.FSFB[name]=obj},retrieveFromAPI:function(name){return API._enforceGlobalNS(),_W.FSR[name]}},domReady=function(ready){function flush(f){loaded=1;do f=fns.shift(),f&&f();while(f)}var fn,fns=[],f=!1,doc=document,testEl=doc.documentElement,hack=testEl.doScroll,domContentLoaded="DOMContentLoaded",addEventListener="addEventListener",onreadystatechange="onreadystatechange",readyState="readyState",loadedRgx=hack?/^loaded|^c/:/^loaded|c/,loaded=loadedRgx.test(doc[readyState]);return doc[addEventListener]&&doc[addEventListener](domContentLoaded,fn=function(){doc.removeEventListener(domContentLoaded,fn,f),flush()},f),hack&&doc.attachEvent(onreadystatechange,fn=function(){/^c/.test(doc[readyState])&&(doc.detachEvent(onreadystatechange,fn),flush())}),ready=hack?function(fn){self!=top?loaded?fn():fns.push(fn):function(){try{testEl.doScroll("left")}catch(e){return setTimeout(function(){ready(fn)},50)}fn()}()}:function(fn){loaded?fn():fns.push(fn)}}(),fsCmd=function(commandName){var hv=(location.hash+"").toLowerCase();return commandName=(commandName||"").toLowerCase(),!!(/fscmd|acscmd|acscommand/.test(hv)&&hv.indexOf(commandName)>-1)};fsCmd("");var locator={};locator.tagVersionString="406dkw7",locator.gatewayLocation=function(){var gwScr,pgwScr,src,tm,gwl,cv,vt,au,svu,scrs=_D.getElementsByTagName("script"),g="gateway",s="/";if(_HD&&(skipInit="true"==attr(_HD,"data-skipfsinit"),gwl=attr(_HD,"data-fsgatewaylocparam"),cv=attr(_HD,"data-codeversion"),vt=attr(_HD,"data-versiontag"),au=attr(_HD,"data-analyticsurl"),svu=attr(_HD,"data-surveyurl"),gwl&&(gwl=getParam(gwl)),cv&&("undefined"!=typeof globalConfig?globalConfig.codeVer=getParam(cv):globalConfig={codeVer:getParam(cv)}),vt&&(locator.tagVersionString=getParam(vt)),au&&("undefined"!=typeof globalConfig?globalConfig.analyticsUrl=getParam(au):globalConfig={analyticsUrl:getParam(au)}),svu&&("undefined"!=typeof globalConfig?globalConfig.surveyUrl=getParam(svu):globalConfig={surveyUrl:getParam(svu)})),eachProp(scrs,function(scr,prop){if("length"!==prop){src=attr(scr,"src")||"";var dv=attr(scr,"data-vendor");"fs"!=dv&&"acs"!=dv||attr(scr,"data-role")!=g?src.indexOf(g)>-1&&(pgwScr=scr):(gwScr=scr,tm=attr(scr,"timing"))}}),gwScr||(gwScr=pgwScr),gwScr)return locator.gwScript=gwScr,src=gwl||attr(gwScr,"src"),src.indexOf(":/")==-1&&src.substr(0,1)!=s&&(scrs=(_W.location.href+"").split(s),scrs[scrs.length-1].indexOf(".")>-1&&scrs[scrs.length-1].toLowerCase()!=_W.location.hostname.toLowerCase()&&scrs.pop(),src=scrs.join(s)+(src.substr(0,1)==s?"":s)+src),src=src.split(s),src.pop(),trimDots(src),tm&&(dependencyTiming=tm.toLowerCase()),src.join(s)+s}(),locator.isProduction=locator.gatewayLocation.toLowerCase().indexOf("production")>-1,locator.normalizeUrl=function(url){url=url.replace("foresee/","trigger/");var rooturl=locator.gatewayLocation||"",tagver=locator.tagVersionString;if(url.indexOf("v=")>-1)return url;if("$"==url.substr(0,1)){var suff=(_moduleLocationOverride||"code/"+globalConfig.codeVer+"/")+url.replace("$","");return"/"==rooturl?rooturl+suff:subtractFromURL(rooturl,3)+suff}"v="+encodeURIComponent(locator.tagVersionString);return url.indexOf("//")==-1&&(url="/"==rooturl.substr(rooturl.length-1,1)&&"/"==url.substr(0,1)?rooturl+url.substr(1):rooturl+url),url+(url.indexOf("?")>-1?"&":"?")+"v="+encodeURIComponent(tagver)},_W._fsNormalizeUrl=_W._acsNormalizeUrl=locator.normalizeUrl;var extMod={supportsDomStorage:supportsDomStorage,hasProp:hasProp,eachProp:eachProp,isDefined:isDefined,isFunction:isFunction,isObject:isObject,isArray:isArray,isDate:isDate,isString:isString,isPlainObject:isPlainObject,proxy:proxy,dispose:dispose,ext:ext,attr:attr,makeURI:locator.normalizeUrl,home:locator.gatewayLocation,isProduction:locator.isProduction,getParam:getParam,nextTick:nextTick,toQueryString:toQueryString,compute:compute,config:globalConfig,domReady:domReady,winReady:winload,tagVersion:"406dkw7",enc:encodeURIComponent,startTS:_W.performance&&_W.performance.timing?_W.performance.timing.responseStart:(new Date).getTime(),API:API};define("fs",function(){return extMod}),define("_acs",function(){return extMod}),domReady(function(){nextTick(function(){var dm,i,fsrd="fsReady";if(locator.gwScript&&(dm=attr(locator.gwScript,"data-module")),isDefined(_W.acsReady)&&(_W[fsrd]=_W.acsReady),!isDefined(_W.acsReady)){var altR=function(){var aT="__"+fsrd+"_stk__";_W[aT]=_W[aT]||[],_W[aT].push(arguments)};_W.acsReady=_W[fsrd]||altR}var dependencies=[];if(eachProp(productConfig,function(obj,prop){isDefined(globalConfig.products[prop.toLowerCase()])&&globalConfig.products[prop.toLowerCase()]===!1&&(obj.check=!1),isFunction(obj.check)&&(obj.check=obj.check.call(obj)),obj.check&&(dependencies=dependencies.concat(obj.dependencies))}),dm)dm&&nextTick(function(){require([_fsNormalizeUrl(dm)],function(){})});else{for(i=0;i<dependencies.length;i++)dependencies[i]=locator.normalizeUrl(dependencies[i]);require(dependencies,function(){if(!_W["__"+fsrd+"__"]){_W["__"+fsrd+"__"]=_W.__acsReady__=_W.fsReady=_W.acsReady=function(){var args=arguments;nextTick(function(){for(var p=0;p<args.length;p++)args[p].call(_W)})};var ns=_W["__"+fsrd+"_stk__"],fnmaker=function(cb){return function(){for(var p=0;p<cb.length;p++)cb[p].call(_W)}};if(ns){for(var i=0;i<ns.length;i++)nextTick(fnmaker(ns[i]));delete _W["__"+fsrd+"_stk__"]}}})}})})}}}();