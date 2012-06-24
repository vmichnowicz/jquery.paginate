(function($) {

	$.fn.paginate = function(options) {

		/**
		 * Super simple JavaScript sprintf method
		 *
		 * It is by no means perfect, however it will work for our error
		 * messages. If string contains something like "{1}" then that text
		 * will be replaced with the second element from our "params" array.
		 *
		 * String: "My name is {0} and I like {1}."
		 * Array: ["Victor", "dinos"]
		 * Return: "My name is Victor and I like dinos."
		 *
		 * @param array		Array of stirngs to replace in target string
		 * @return object	JavaScript string object
		 */
		String.prototype.sprintf = function(params) {
			var string = this;
			$.each(params, function(index, param) {
				string = string.replace('{' + index + '}', param);
			});
			return string;
		}

		// Merge options into settings object
		var settings = $.extend({
			controls: '#pagination',
			controlNext: $('<span class="next"><a href="javascript:void(0);">Next &rsaquo;</a></span>'),
			controlFirst: $('<span class="first"><a href="javascript:void(0);">&laquo; First</a></span>'),
			controlPrev: $('<span class="prev"><a href="javascript:void(0);">&lsaquo; Previous</a></span>'),
			controlLast: $('<span class="last"><a href="javascript:void(0);">Last &raquo;</a></span>'),
			controlPage: $('<span class="page"><a href="javascript:void(0);"></a></span>'),
			items: null,
			itemsPerPage: 10,
			itemsPerPageOptions: [5, 10, 15, 25, 50, 'Show All'],
			controlOptions: $('<span class=""><label for="item_control">Select something:</label> <select name="" id="item_control"></select></span>'),
			currentPage: 0,
			_goFirst: function(P) {
				if (P.currentPage !== 0) {

					P.currentPage = 0;
					P.prevPage = null;
					P.nextPage = P.numPages > 0 ? P.currentPage + 1 : null;

					P = settings._reBuild(P);
				}

				return P;
			},
			_goPrev: function(P) {
				if (P.prevPage !== null) {
					P.nextPage = P.currentPage;
					P.currentPage = P.prevPage;
					P.prevPage = P.currentPage > 0 ? P.currentPage - 1 : null;

					P = settings._reBuild(P);
				}

				return P;
			},
			_goPage: function(P, page) {
				if (P.pages[ page ]) {
					P.currentPage = page;
					P.nextPage = P.numPages === P.currentPage + 1 ? null : P.currentPage + 1;
					P.prevPage = P.currentPage > 0 ? P.currentPage - 1 : null;

					P = settings._reBuild(P);
				}
				return P;
			},
			_goNext: function(P) {
				if (P.nextPage !== null) {
					P.prevPage = P.currentPage;
					P.currentPage = P.nextPage;
					P.nextPage = P.numPages === P.currentPage + 1 ? null : P.currentPage + 1;

					P = settings._reBuild(P);
				}
				return P;
			},
			_goLast: function(P) {
				if ( P.currentPage !== P.numPages - 1) {
					P.currentPage = P.numPages - 1;
					P.prevPage = P.currentPage > 0 ? P.currentPage - 1 : null;
					P.nextPage = null;;

					P = settings._reBuild(P);
				}
				return P;
			},
			_reBuild: function(P) {
				P = settings._buildPages(P);
				P = settings._buildStyles(P);
				return P;
			},
			_buildPages: function(P) {
				P.numPages = Math.ceil( P.numItems / P.itemsPerPage );
				P.lastPage = P.numPages > 0 ? P.numPages - 1 : null;

				P.pages = [];

				// Loop through each item
				$(P.items).each(function(index, item) {
					// Determine what page this item is on
					var page =  Math.floor( index / P.itemsPerPage );
//console.log(page);
					// If this page does not have any items defined yet
					if ( ! P.pages[page] ) {
						P.pages[page] = [];
					}

					// Add page
					P.pages[page].push(index);
				});

				// Hide all items
				$(P.items).hide();
//console.log(P, P.currentPage);
				// Get all items visible on this page
				var currentItems = P.pages[ P.currentPage ];

				// Show all items visible on this page
				for (var i = 0; i < currentItems.length; i++) {
					$(P.items).eq( currentItems[i] ).show();
				}

				return P;
			},
			_buildStyles: function(P) {
				if (P.controls) {
					for (i in P.controls) {
						P.controls[i].removeClass('disabled');
						P.controls[i].find('a').removeClass('current');
					}
					if (P.currentPage === 0) {
						P.controls.first.addClass('disabled');
						P.controls.prev.addClass('disabled');
					}
					if (P.currentPage === P.numPages - 1) {
						P.controls.last.addClass('disabled');
						P.controls.next.addClass('disabled');
					}
					P.controls.page.find('a[href*="' + ( P.currentPage + 1 ) + '"]').addClass('current');
				}

				return P;
			},
			_buildControls: function(P) {

				// Items per page control
				var options = settings.controlOptions.clone();

				if (settings.itemsPerPageOptions.length > 0) {
					for (var i = 0; i < settings.itemsPerPageOptions.length; i++) {
						var limit = settings.itemsPerPageOptions[i];
						var option = $('<option />')
							.attr('value', typeof limit ==='number' ? limit : null)
							.text(limit);

						if (typeof limit === 'string' || (typeof limit === 'number' && limit <= P.items.length) ) {

							if ( P.itemsPerPage == limit || ( typeof limit === 'string' && P.itemsPerPage === null ) ) {

								$(option).attr('selected', true);
							}
							if ( options.is('select') ) {
								$(options).append(option);
							}
							else {
								$(options).find('select').append(option);
							}
						}
					}
				}

				// Items per page
				options.change(function(e) {
					P.itemsPerPage = $(this).is('select') ? $(this).val() : $(this).find('select').val();
					var itemPageFirst = P.pages[ P.currentPage ][0];

					P.currentPage = Math.floor( (itemPageFirst + 1) / P.itemsPerPage );

					P = settings._buildPages(P);
					P = settings._buildStyles(P);
					P = settings._buildControls(P);
				});

				var pages = $();

				for (var i = 0; i < P.numPages; i++) {
					var page = settings.controlPage.clone(false, false);
					
					if ( page.attr('href') ) {
						page.attr('href', '#' + ( i + 1) );
					}
					else {
						page.find('a').attr('href', '#' + ( i + 1) ).text( i + 1 );
					}

					pages = pages.add(page);
				}

				pages.click(function(e) {
					e.preventDefault();
					var page = parseInt( $(e.target).attr('href').replace('#', '') ) - 1;
					P = settings._goPage(P, page);
				});

				P.controls = {
					options: options,
					first: settings.controlFirst.clone(false, false),
					prev: settings.controlPrev.clone(false, false),
					page: pages,
					next: settings.controlNext.clone(false, false),
					last: settings.controlLast.clone(false, false)
				}

				// First
				P.controls.first.click(function(e) {
					P = settings._goFirst(P);
				});

				// Previous
				P.controls.prev.click(function(e) {
					P = settings._goPrev(P);
				});

				// Next
				P.controls.next.click(function(e) {
					P = settings._goNext(P);
				});

				// Last
				P.controls.last.click(function(e) {
					P = settings._goLast(P);
				});

				$( settings.controls ).empty().append(options, P.controls.first, P.controls.prev, P.controls.page, P.controls.next, P.controls.last);

				P = settings._buildStyles(P);
				return P;
			}
		}, options);

		return this.each(function() {

			var items = settings.items === null ? $(this).children() : $(this).find( settings.items );
			var numItems = $(items).length;

			var P = {
				items: items,
				itemsPerPage: settings.itemsPerPage,
				numItems: numItems,
				numPages: null,
				pages: [],
				firstPage: 0,
				lastPage: null,
				nextPage: 1,
				prevPage: null,
				currentPage: settings.currentPage,
				controls: null
			}

			// Build pages
			P = settings._buildPages(P);

			// Build controls
			P = settings._buildControls(P);

			//console.log(P);
		});
	}

})(jQuery);