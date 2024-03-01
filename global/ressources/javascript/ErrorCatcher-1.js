!function(a,b,c,d,e,f,g,h){a.RaygunObject=e,a[e]=a[e]||function(){
(a[e].o=a[e].o||[]).push(arguments)},f=b.createElement(c),g=b.getElementsByTagName(c)[0],
f.async=1,f.src=d,g.parentNode.insertBefore(f,g),h=a.onerror,a.onerror=function(b,c,d,f,g){
h&&h(b,c,d,f,g),g||(g=new Error(b)),a[e].q=a[e].q||[],a[e].q.push({
e:g})}}(window,document,"script","//cdn.raygun.io/raygun4js/raygun.min.js","rg4js");

if ((ACTIVE_RAYGUN ? ACTIVE_RAYGUN : false) && false) {    
	const _ErrorCatcher = new class {
		constructor() {
			this.Errors = [];
			this.Config = {
				'apiKey'				: 'RGIJaexc5ocx0cL0f1N13Q',
				'enableCrashReporting'	: false,
				'withTags'              : [DB ? DB : '', ENV ? ENV : '' ],
				'options'				: {
					debugMode: false
				}
			};
			this.Init();
			window.addEventListener('error', evt => this.Send(evt), false);
		}

		Init() {
			for (const [key, value] of Object.entries(this.Config))
				rg4js(key, value);
		}
	
		GetContent(evt) {
			let stack = evt.error && evt.error.stack ? `\nStack Trace:\n${evt.error.stack}` : '';
			return `Message: ${evt.message}\nFile name: ${evt.filename}\nLine: ${evt.lineno}\nColumn: ${evt.colno}\nExecution time: ${evt.timeStamp}ms${stack}`;
		}

		AlreadySended(evt) {
			if (!evt || !evt.filename || !evt.lineno || !evt.colno)
				return true;
			let key = evt.filename + ':' + evt.lineno + ':' + evt.colno;
			if (this.Errors[key])
				return true;
			this.Errors[key] = evt;
			return false;
		}
	
		Send(evt) {
			if (!evt || this.AlreadySended(evt))
			    return;
			rg4js('send', {
			    error: new Error(this.GetContent(evt)),
			});
		}
	}
}
