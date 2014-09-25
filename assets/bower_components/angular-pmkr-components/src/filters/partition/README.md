# Partition

Accept an array or string and breaks them into arrays of the given size.

The `partition` filter is especially useful for generating rows and columns for a grid system as in Twitter Bootstrap.

## Dependencies

- [filterStabilize][1] - Prevents infinite digest cycles.

## Usage:

```html
<div ng-repeat="rows in [1,2,3,4,5] | pmkr.partition:3">
  <p>Row</p>
  <div ng-repeat="item in rows">{{item}}</div>
</div>
```

## Output:

```html
<div>
  <p>Row</p>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
<div>
  <p>Row</p>
  <div>4</div>
  <div>5</div>
</div>
```

### Parameters

#### size

Type: `Number`

The partition size.

  [1]: https://github.com/m59peacemaker/angular-pmkr-components/tree/master/src/services/filterStabilize