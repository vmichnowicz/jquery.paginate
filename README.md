# jQuery Paginate

## License

jQuery Paginate is licensed under the MIT License.

## Introduction

jQuery Paginate is pagination plugin for jQuery 1.4.3 and higher.

## Options

The jQuery Paginate plugin can be customized in many ways to suit your needs.

### items [ string *null* ]

The `items` property allows you to manually determine what items will be paginated. It works by finding decendents of the initial jQuery object that was passed to the paginate plugin. For example, assume the following HTML:

````
<table>
	<tbody>
		<tr class="odd">
			<td>One</td>
		</tr>
		<tr class="even">
			<td>Two</td>
		</tr>
		<tr class="odd">
			<td>Three</td>
		</tr>
		<tr class="even">
			<td>Four</td>
		</tr>
	</tbody>
</table>
````

By default calling the paginate plugin on this table body will paginate all direct children. In this case all table rows would be paginated.

````
$('table tbody').paginate();
````

However, if you only wanted to paginate the table rows with a class of `odd` then you would instantiate the pagination plugin similar to this:

````
$('table tbody').paginate({
	items: '.odd'
});
````

### controls [ object *jQuery('#pagination_controls')* ]

The `controls` options allows you to provide a jQuery object containing the element where you want your pagination controls to appear. By default it looks for an element with an `id` of `pagination_controls`. This can be changed, however. For example, assume you have the following HTML:

````
<div id="my_pagination_controls"></div>
````

If you would like your pagination controls to appear in this div then you would modify the default `controls` option to something like this:

````
$('table tbody').paginate({
	controls: $('#my_pagination_controls')
});
````

### status [ object *jQuery('#pagination_status')* ]

The `status` options allows you to provide a jQuery object containing the element where you want your pagination status to appear. By default it looks for an element with an `id` of `pagination_status`. This can be changed, however. For example, assume you have the following HTML:

````
<div id="my_pagination_status"></div>
````

If you would like your pagination controls to appear in this div then you would modify the default `controls` option to something like this:

````
$('table tbody').paginate({
	status: $('#my_pagination_status')
});
````

### controlNext

### controlFirst

### controlPrev

### controlLast

### controlPage

### statusTemplate

### itemsPerPage

### itemsPerPageOptions

### controlOptions

### currentPage