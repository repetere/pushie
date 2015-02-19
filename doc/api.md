<a name="pushie"></a>
#class: pushie
**Members**

* [class: pushie](#pushie)
  * [new pushie(options)](#new_pushie)
  * [pushie.__replaceHistory(options)](#pushie#__replaceHistory)
  * [pushie.__pushHistory(options)](#pushie#__pushHistory)
  * [pushie.__popHistory(options)](#pushie#__popHistory)
  * [pushie.__init()](#pushie#__init)

<a name="new_pushie"></a>
##new pushie(options)
A module that represents a pushie object, a componentTab is a page composition tool.

**Params**

- options `object` - configuration options  

**Author**: Yaw Joseph Etse  
**License**: MIT  
**Copyright**: Copyright (c) 2014 Typesettin. All rights reserved.  
**Example**  

		pushie_id: token(),
		push_state_support: true,
		replacecallback: function (data) {
			console.log(data);
		},
		popcallback: function (data) {
			console.log(data);
		},
		pushcallback: function (data) {
			console.log(data);
		}

<a name="pushie#__replaceHistory"></a>
##pushie.__replaceHistory(options)
sets replace state

**Params**

- options `object` - data,title,href  

<a name="pushie#__pushHistory"></a>
##pushie.__pushHistory(options)
sets push state

**Params**

- options `object` - data,title,href  

<a name="pushie#__popHistory"></a>
##pushie.__popHistory(options)
restores pop state

**Params**

- options `object` - data,title,href  

<a name="pushie#__init"></a>
##pushie.__init()
sets detects support for history push/pop/replace state and can set initial data

