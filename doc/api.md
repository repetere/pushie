<a name="pushie"></a>
#class: pushie
**Members**

* [class: pushie](#pushie)
  * [new pushie(options)](#new_pushie)
  * [pushie.__ajaxSubmitPushie(e, element)](#pushie#__ajaxSubmitPushie)
  * [pushie.__submit()](#pushie#__submit)
  * [pushie.__autoSubmitFormOnChange()](#pushie#__autoSubmitFormOnChange)
  * [pushie.__submitOnChangeListeners()](#pushie#__submitOnChangeListeners)
  * [pushie.__preventSubmitOnEnter(e)](#pushie#__preventSubmitOnEnter)
  * [pushie.__preventEnterSubmitListeners()](#pushie#__preventEnterSubmitListeners)
  * [pushie.__ajaxFormEventListers()](#pushie#__ajaxFormEventListers)
  * [pushie._init()](#pushie#_init)

<a name="new_pushie"></a>
##new pushie(options)
A module that represents a pushie object, a componentTab is a page composition tool.

**Params**

- options `object` - configuration options  

**Author**: Yaw Joseph Etse  
**License**: MIT  
**Copyright**: Copyright (c) 2014 Typesettin. All rights reserved.  
**Example**  

		ajaxsubmitclassname: 'pushie',
		ajaxsubmitfileuploadclassname: 'pushie-file',
		ajaxformselector: '#pushie',
		jsonp: false,
		autosubmitselectors: '.autoFormSubmit',
		autosubmitelements: [],
		preventsubmitselectors: '.noFormSubmit',
		preventsubmitelements: [],
		headers: {},
		queryparameters: {},
		postdata: {},
		beforesubmitcallback: null,
		errorcallback: null,
		successcallback: null

<a name="pushie#__ajaxSubmitPushie"></a>
##pushie.__ajaxSubmitPushie(e, element)
asynchronously submit from data, supports, POST, GET, and GET JSONP

**Params**

- e `object` - form submit event  
- element `object` - form html element  

**Returns**: `function` - ajaxResponseHandler(error, response)  
<a name="pushie#__submit"></a>
##pushie.__submit()
submit pushie via ajax

<a name="pushie#__autoSubmitFormOnChange"></a>
##pushie.__autoSubmitFormOnChange()
submit current form if html element has ajaxsubmitclassname class

<a name="pushie#__submitOnChangeListeners"></a>
##pushie.__submitOnChangeListeners()
add change listener for form elements with autosubmitselectors class

<a name="pushie#__preventSubmitOnEnter"></a>
##pushie.__preventSubmitOnEnter(e)
prevent element from submitting form when pressing enter key

**Params**

- e `object` - keypress event  

**Returns**: `boolean` - also e.preventDefault();  
<a name="pushie#__preventEnterSubmitListeners"></a>
##pushie.__preventEnterSubmitListeners()
add keypress listeners to form elements that have preventsubmitselectors class to prevent submitting form on enter key

<a name="pushie#__ajaxFormEventListers"></a>
##pushie.__ajaxFormEventListers()
add submit event listener to pushie form

<a name="pushie#_init"></a>
##pushie._init()
sets this.options.form, also adds event listener for pushie form [this.ajaxFormEventListers()], adds auto submit form listeners [this.submitOnChangeListeners()], and prevent submit listeners [this.preventEnterSubmitListeners()]

