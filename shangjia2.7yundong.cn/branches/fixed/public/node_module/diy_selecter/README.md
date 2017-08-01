## Installation

via npm:

```bash
$ npm install diy_selecter
```


## Use

```html

    // how to use ?

    // html
    
    <select><option value="1">1</option></select>
    <select><option value="2">2</option></select>
    <select><option value="3">3</option></select>

```

```javascript

    // how to use ?

    // js
    
    var mySelecter = Object.create(DIYselecter);
    mySelecter.init(Array.prototype.slice.call($('select')));


    // change
    $('select').change(function(){
      console.log(this.value);
      this.innerHTML = '<option>'+ (Number(this.value) + 1) +'</option>';
      this.action.reset();
    })

```