# jQuery Paginate

## License

jQuery Paginate is licensed under the MIT License.

## Introduction

jQuery Paginate is pagination plugin for jQuery 1.4.3 and higher.

## Basic Usage

Paginating data with this plugin is fairly simple. At a minimum you need to know two things.

1. The parent element of all the data you want to paginate
2. An element where you want your pagination controls to appear

### Getting Pagination Data

Assume you have some table rows that you want to paginate. The parent of all these table rows is the table `tbody` element.

````
<table>
	<tbody>
		<tr>
			<td>One</td>
		</tr>
		<tr>
			<td>Two</td>
		</tr>
		<tr>
			<td>Three</td>
		</tr>
		<tr>
			<td>Four</td>
		</tr>
	</tbody>
</table>
````

````
$('table tbody').paginate({
	// More options here...
});
````

Similarly, if you have some unordered list items that you want paginated you would select the parent `ul` element.

````
<ul>
	<li>Data 1</li>
	<li>Data 2</li>
	<li>Data 3</li>
	<li>Data 4</li>
	<li>Data 5</li>
</ul>
````

````
$('ul').paginate({
	// More options here...
});
````

### Getting Pagination Control Element

The next step is getting an element where you want your pagination controls to show up. These controls will allow you to navigate the paginated data. By default jQuery Paginate will look for an element with an ID of `pagination_controls`.

````
<ul>
	<li>Data 1</li>
	<li>Data 2</li>
	<li>Data 3</li>
	<li>Data 4</li>
	<li>Data 5</li>
</ul>

<div id="pagination_controls"></div>
````

````
$('ul').paginate({
	// More options here...
});
````

If you want to have your pagination controls in a different element you can change it with the `controls` parameter.

````
<ul>
	<li>Data 1</li>
	<li>Data 2</li>
	<li>Data 3</li>
	<li>Data 4</li>
	<li>Data 5</li>
</ul>

<div id="my_awesome_pagination_controls"></div>
````

````
$('ul').paginate({
	controls: $('#my_awesome_pagination_controls')
});
````

## Options

The jQuery Paginate plugin can be customized in many ways to suit your needs.

### items [ string ]

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

### controls [ object *jQuery* ]

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

### status [ object *jQuery* ]

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

### controlNext [ object *jQuery* ]

This object contains a jQuery object representing the link you would like to use for the next operation.

### controlFirst [ object *jQuery* ]

This object contains a jQuery object representing the link you would like to use for the first operation.

### controlPrev [ object *jQuery* ]

This object contains a jQuery object representing the link you would like to use for the previous operation.

### controlLast [ object *jQuery* ]

This object contains a jQuery object representing the link you would like to use for the last operation.

### controlPage [ object *jQuery* ]

This object contains a jQuery object representing the links you would like to use to navigate to each page.

### statusTemplate [ object *jQuery* ]

jQuery object containing the HTML element where you would like to display your pagination status.

### itemsPerPage [ integer *10* ]

Controls the maximun amount of items that will appear on each page.

### controlPagesVisible [ integer *5* ]

Controls the maximum abount to page controls that will display at any given time. This comes in handy if you have mutiple pages and do not want all controls visible at all times.

### itemsPerPageOptions [ array *array(5, 10, 25, "Show All"])* ]

Allow you to set a dropdown letting the user adjust the amount of items shown on each page. Items per page are all integers and any text value will be interperted as an option to view all items.

### controlOptions [ object *jQuery* ]

jQuery object containing the HTML element where you would like your pagination controls to appear.

### currentPage [ integer *0* ]

Change the default current page.