(function($) {

	/**
	 * Find an element and include current element in selection
	 *
	 * @author Jeoff Wilks
	 * @url http://stackoverflow.com/a/3742019
	 */
	$.fn.findAndSelf = function(selector) {
		return this.find(selector).add(this.filter(selector))
	}

	/**
	 * Paginate
	 *
	 * @author Victor Michnowicz
	 * @url https://github.com/vmichnowicz/jquery.paginate
	 */
	$.fn.paginate = function(options) {

		// Merge options into settings object
		var settings = $.extend({
			controls: $('#pagination_controls'),
			controlNext: $('<a href="javascript:void(0);" class="next">Next &rsaquo;</a>'),
			controlFirst: $('<a href="javascript:void(0);" class="first">&laquo; First</a>'),
			controlPrev: $('<a href="javascript:void(0);" class="prev">&lsaquo; Previous</a>'),
			controlLast: $('<a href="javascript:void(0);" class="last">Last &raquo;</a>'),
			controlPage: $('<a href="javascript:void(0);" class="page"></a>'),
			items: null,
			status: $('#pagination_status'),
			statusTemplate: $('<p>Viewing items <em class="first_page_item">{0}</em> - <em class="last_page_item">{1}</em> of <em class="total_items">{2}</em></p>'),
			itemsPerPage: 10,
			itemsPerPageOptions: [5, 10, 15, 25, 50, 'Show All'],
			controlOptions: $('<span class="items_per_page"><label for="items_per_page">Items per page:</label> <select name="items_per_page" id="items_per_page"></select></span>'),
			currentPage: 0,
			classDisabled: 'disabled',
			classCurrent: 'current',
			/**
			 * Go to first page
			 * 
			 * @access protected
			 * @param object
			 * @return object
			 */
			_goFirst: function(P) {
				if (P.currentPage !== 0) {

					P.currentPage = 0;
					P.prevPage = null;
					P.nextPage = P.numPages > 0 ? P.currentPage + 1 : null;

					P = settings._buildPages(P);
					P = settings._buildStyles(P);
				}

				return P;
			},
			/**
			 * Go to previous page
			 *
			 * @access protected
			 * @param object
			 * @return object
			 */
			_goPrev: function(P) {
				if (P.prevPage !== null) {
					P.nextPage = P.currentPage;
					P.currentPage = P.prevPage;
					P.prevPage = P.currentPage > 0 ? P.currentPage - 1 : null;

					P = settings._buildPages(P);
					P = settings._buildStyles(P);
				}

				return P;
			},
			/**
			 * Go to a particular page
			 *
			 * @access protected
			 * @param object
			 * @param int
			 * @return object
			 */
			_goPage: function(P, page) {
				if (P.pages[ page ]) {
					P.currentPage = page;
					P.nextPage = P.numPages === P.currentPage + 1 ? null : P.currentPage + 1;
					P.prevPage = P.currentPage > 0 ? P.currentPage - 1 : null;

					P = settings._buildPages(P);
					P = settings._buildStyles(P);
				}
				return P;
			},
			/**
			 * Go to next page
			 *
			 * @access protected
			 * @param object
			 * @return object
			 */
			_goNext: function(P) {
				if (P.nextPage !== null) {
					P.prevPage = P.currentPage;
					P.currentPage = P.nextPage;
					P.nextPage = P.numPages === P.currentPage + 1 ? null : P.currentPage + 1;

					P = settings._buildPages(P);
					P = settings._buildStyles(P);
				}
				return P;
			},
			/**
			 * Go to last page
			 *
			 * @access protected
			 * @param object
			 * @return object
			 */
			_goLast: function(P) {
				if ( P.currentPage !== P.numPages - 1) {
					P.currentPage = P.numPages - 1;
					P.prevPage = P.currentPage > 0 ? P.currentPage - 1 : null;
					P.nextPage = null;;

					P = settings._buildPages(P);
					P = settings._buildStyles(P);
				}
				return P;
			},
			/**
			 * Build pages
			 *
			 * @access protected
			 * @param object
			 * @return object
			 */
			_buildPages: function(P) {
				P.numPages = P.itemsPerPage === null ? 1 : Math.ceil( P.numItems / P.itemsPerPage );
				P.prevPage = P.currentPage === 0 ? null : P.currentPage - 1;
				P.nextPage = ( P.currentPage + 1 ) < P.numPages ? P.currentPage + 1 : null;
				P.lastPage = P.numPages - 1;

				P.pages = [];

				// Loop through each item
				$(P.items).each(function(index, item) {
					/**
					 * Determine what page this item is on
					 * 
					 * If items per page is null show all items on first page
					 */
					var page =  P.itemsPerPage === null ? 0 : Math.floor( index / P.itemsPerPage );

					// If this page does not have any items defined yet
					if ( ! P.pages[page] ) {
						P.pages[page] = [];
					}

					// Add page
					P.pages[page].push(index);
				});

				// Hide all items
				$(P.items).hide();

				// Get all items visible on this page
				var currentItems = P.pages[ P.currentPage ];

				// Show all items visible on this page
				for (var i = 0; i < currentItems.length; i++) {
					$(P.items).eq( currentItems[i] ).show();
				}

				/**
				 * Update status text
				 *
				 * Update template from something like "Viewing rows {0} - {1}
				 * of {2}." to "Viewing rows 6 - 10 of 47."
				 */
				if (settings.status && P.statusTemplate) {
					var statusText = settings.statusTemplate.html(); // Get template
					statusText = statusText.replace('{0}', P.pages[ P.currentPage ][0] + 1); // First item on page
					statusText = statusText.replace('{1}', P.pages[ P.currentPage ][ P.pages[ P.currentPage ].length - 1 ] + 1); // Last item on page
					statusText = statusText.replace('{2}', P.numItems); // Total number of items
					P.statusTemplate = settings.statusTemplate.clone(false).html(statusText);

					settings.status.html(P.statusTemplate);
				}

				return P;
			},
			/**
			 * Build CSS styles
			 *
			 * @access protected
			 * @param object
			 * @return object
			 */
			_buildStyles: function(P) {

				// If we have pagination controls
				if (P.controls) {
					// Loop through all controls ("first", "prev", "next", "last", and "pages")
					for (control in P.controls) {
						// If this is a "first", "prev", "next", or "last" control (everything but "pages"
						if (control !== 'pages') {
							P.controls[control].removeClass( settings.classDisabled );
						}
					}

					// If we are on the first page
					if (P.currentPage === 0) {
						P.controls.first.addClass( settings.classDisabled );
						P.controls.prev.addClass( settings.classDisabled );
					}

					// If we are on the last page
					if (P.currentPage === P.numPages - 1) {
						P.controls.last.addClass( settings.classDisabled );
						P.controls.next.addClass( settings.classDisabled );
					}

					// Loop through all page controls
					$(P.controls.pages).each(function(index, page) {

						// Remove current class from all page controls
						$(page).findAndSelf('a').removeClass( settings.classCurrent );

						// If this is the current page, add current class to page control
						if (index === P.currentPage) {
							$(page).findAndSelf('a').addClass( settings.classCurrent );
						}
					});
				}

				return P;
			},
			/**
			 * Build controls
			 *
			 * Controls include the first, previous, next, last, and page
			 * buttons. It also includes the items-per-page select dropdown.
			 *
			 * @access protected
			 * @param object
			 * @return object
			 */
			_buildControls: function(P) {

				// Items per page control (default to empty jQuery object)
				var options = $();

				// If user has custom items-per-page options
				if (settings.itemsPerPageOptions !== null && settings.itemsPerPageOptions.length > 0) {

					// Set options to user-provided jQuery object
					options = settings.controlOptions.clone(false);

					// Loop through each custom items-per-page option
					for (var i = 0; i < settings.itemsPerPageOptions.length; i++) {
						var limit = settings.itemsPerPageOptions[i];
						var option = $('<option />')
							.attr('value', typeof limit ==='number' ? limit : '')
							.text(limit);

						if (typeof limit === 'string' || (typeof limit === 'number' && limit <= P.items.length) ) {

							if ( P.itemsPerPage == limit || ( typeof limit === 'string' && P.itemsPerPage === null ) ) {
								$(option).attr('selected', true);
							}

							options.findAndSelf('select').append(option);
						}
					}

					// Items per page change
					options.change(function(e) {
						P.itemsPerPage = $(this).findAndSelf('select').val();
						P.itemsPerPage = P.itemsPerPage == '' ? null : parseInt( P.itemsPerPage ); // Set to null if items per page is blank, else convert to integer

						var itemPageFirst = P.pages[ P.currentPage ][0]; // Get the first item on the current page

						/**
						 * Our *new* current page will be sure to include the
						 * item that was the first on the *old* current page.
						 * This will make it so when a user changes the items
						 * per page option he is viewing a similar set of data
						 * as he was viewing before.
						 *
						 * For example, if our user was viewing 5 items per page
						 * and was looking at items 6 - 10 and then wanted to
						 * view 10 items per page, he would then be looking at
						 * items 6 - 15.
						 */
						P.currentPage = P.itemsPerPage == null ? 0 : Math.floor( (itemPageFirst + 1) / P.itemsPerPage );

						P = settings._buildPages(P);
						P = settings._buildStyles(P);
						P = settings._buildControls(P);
					});
				}

				var pages = $(); // Empty jQuery object

				// Loop through all of our pages
				for (var i = 0; i < P.numPages; i++) {
					var page = settings.controlPage.clone(false);

					page.findAndSelf('a').attr('href', '#' + ( i + 1) ).text( i + 1 );

					pages = pages.add(page);
				}

				// Navigate to a particular page on click
				pages.click(function(e) {
					e.preventDefault();
					var page = parseInt( $(e.target).attr('href').replace('#', '') ) - 1;
					P = settings._goPage(P, page);
				});

				P.controls = {
					options: options,
					first: settings.controlFirst.clone(false),
					prev: settings.controlPrev.clone(false),
					pages: pages,
					next: settings.controlNext.clone(false),
					last: settings.controlLast.clone(false)
				}

				// Go to first page on click
				P.controls.first.click(function(e) {
					P = settings._goFirst(P);
				});

				// Go to previous page on click
				P.controls.prev.click(function(e) {
					P = settings._goPrev(P);
				});

				// Go to next page on click
				P.controls.next.click(function(e) {
					P = settings._goNext(P);
				});

				// Go to last page on click
				P.controls.last.click(function(e) {
					P = settings._goLast(P);
				});

				// Replace all controls
				$(settings.controls)
					.empty()
					.append(P.controls.options, P.controls.first, P.controls.prev, P.controls.pages, P.controls.next, P.controls.last);

				P = settings._buildStyles(P);

				return P;
			}
		}, options);

		// Loop through each jQuery object
		return this.each(function() {

			/**
			 * Get all items
			 *
			 * Default to all children. If a custom jQuery selector was provided
			 * use that to determine what to paginate.
			 */
			var items = settings.items === null ? $(this).children() : $(this).find( settings.items );
			var numItems = $(items).length;

			// Build main pagination object
			var P = {
				items: items,
				itemsPerPage: settings.itemsPerPage,
				numItems: numItems,
				numPages: null,
				pages: [],
				firstPage: 0,
				lastPage: null,
				nextPage: null,
				prevPage: null,
				currentPage: settings.currentPage,
				controls: null,
				statusTemplate: settings.statusTemplate ? settings.statusTemplate : null
			}

			// Build pages
			P = settings._buildPages(P);

			// Build controls
			P = settings._buildControls(P);
		});
	}

})(jQuery);