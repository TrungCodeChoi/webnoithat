$(document).ready(function($) {
	"use strict";

	$('.isotope-grid-post').each(function() {
		var $this = $(this);
		var $filter = $this.parent().find('.noo-product-filter');
		var defaultFilter = $this.attr('data-filter');
		$this.imagesLoaded(function() {
			$this.isotope({
				itemSelector: '.noo-product-item',
				filter: defaultFilter
			});
		});

		$filter.find('a').on("click", function(e) {
			e.preventDefault();
			$filter.find("a").removeClass('active');
			$(this).addClass('active');
			var data_filter = $(this).data('filter');
			$this.isotope({
				filter: data_filter
			});
		});
	});
	
	$('.blog-masonry').each(function() {
		var $this = $(this);
		var $filter = $this.parent().find('.blog-filter');
		var defaultFilter = $this.attr('data-filter');
		$this.imagesLoaded(function() {
			$this.isotope({
				itemSelector: '.blog-masonry-item',
				filter: defaultFilter
			});
		});

		$filter.find('a').on("click", function(e) {
			e.preventDefault();
			$filter.find("a").removeClass('active');
			$(this).addClass('active');
			var data_filter = $(this).data('filter');
			$this.isotope({
				filter: data_filter
			});
		});
	});
});
