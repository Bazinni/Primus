/**
 * Script Render Datalayer
 *
 * @version 1.1.0
 * @package 'datalayer'
 */

jQuery( function ( $ ) {
	if (RenderDatalayer.addToCartJsEvents) {
		jQuery( 'a[href*=add-to-cart],body.single-product button[name=add-to-cart]' ).on( 'click', function(){
			var quantity = jQuery( this ).data( 'quantity' );
			if ( ! quantity) {
				quantity = 1;
			}
			var product_id = jQuery( this ).data( 'product_id' );
			var id         = jQuery( this ).val();

			var productClicked = false;
			if (product_id) {
				productClicked = RenderDatalayer.products.find( element => element.id_match == product_id );
			}
			if (id) {
				productClicked = RenderDatalayer.products.find( element => element.id_match == id );
			}

			if (jQuery( this ).hasClass('single_add_to_cart_button')) {
				productClicked = RenderDatalayer.currentProduct[0];
			}

			if (productClicked) {
				delete productClicked.id_match;
				if (RenderDatalayer.datalayerOption == 'UA') {
					dataLayer.push(
						{
							'event': 'addToCart',
							'event_id': RenderDatalayer.eventId,
							'ecommerce': {
								'currencyCode': RenderDatalayer.currencyCode,
								'add': {
									'actionField': {'list': productClicked.list},
									'products': [ productClicked ]
								}
							}
						}
					);
				}
				if (RenderDatalayer.datalayerOption == 'GA4') {
					dataLayer.push( { ecommerce: null } );
					dataLayer.push(
						{
							'event': 'add_to_cart',
							'event_id': RenderDatalayer.eventId,
							'ecommerce': {
								'currency': RenderDatalayer.currencyCode,
								'items': [ productClicked ]
							}
						}
					);
				}
			}
		});

		jQuery( "body.single-product .woocommerce-variation-add-to-cart button.single_add_to_cart_button" ).on(
			"click",
			function(){
				if ( ! jQuery( this ).hasClass( 'disabled' )) {
					var quantity   = 1;
					var product_id = jQuery( this ).parent().find( 'input[name=variation_id]' ).val();
					var variant = RenderDatalayer.currentProduct[0].variations.find( element => element.id == product_id );
					var price = RenderDatalayer.currentProduct[0].variations.find( element => element.id == product_id );

					RenderDatalayer.currentProduct[0].price = price.variation_price;
					delete RenderDatalayer.currentProduct[0].id_match;
					delete RenderDatalayer.currentProduct[0].variations;

					if (RenderDatalayer.datalayerOption == 'UA') {
						RenderDatalayer.currentProduct[0].variant = variant.variation_name;
						dataLayer.push(
							{
								'event': 'addToCart',
								'event_id': RenderDatalayer.eventId,
								'ecommerce': {
									'currencyCode': RenderDatalayer.currencyCode,
									'add': {
										'actionField': {'list': RenderDatalayer.currentProduct[0].list},
										'products': RenderDatalayer.currentProduct
									}
								}
							}
						);
					}
					if (RenderDatalayer.datalayerOption == 'GA4') {
						RenderDatalayer.currentProduct[0].item_variant = variant.variation_name;
						dataLayer.push( { ecommerce: null } );
						dataLayer.push(
							{
								'event': 'add_to_cart',
								'event_id': RenderDatalayer.eventId,
								'ecommerce': {
									'currency': RenderDatalayer.currencyCode,
									'items': RenderDatalayer.currentProduct
								}
							}
						);
					}
				}
			}
		);
	}

	jQuery( 'li.product,div.product-list-item' ).click(
		function () {
			var product_id     = jQuery( this ).find( 'a[href*=add-to-cart],a[href*=add_to_wishlist] ,a.product_type_variable, a.product_type_external' ).data( 'product_id' );
			var id             = jQuery( this ).find( 'div' ).data( 'id' );
			var productClicked = false;
			if (product_id) {
				productClicked = RenderDatalayer.products.find( element => element.id_match == product_id );
			}
			if (id) {
				productClicked = RenderDatalayer.products.find( element => element.id_match == id );
			}
			if (productClicked) {
				delete productClicked.id_match;
				if (RenderDatalayer.datalayerOption == 'UA') {
					dataLayer.push(
						{
							'event': 'productClick',
							'event_id': RenderDatalayer.eventId,
							'ecommerce': {
								'currencyCode': RenderDatalayer.currencyCode,
								'click': {
									'actionField': {'list': productClicked.list},
									'products': [ productClicked ]
								}
							}
						}
					);
				}
				if (RenderDatalayer.datalayerOption == 'GA4') {
					dataLayer.push( { ecommerce: null } );
					dataLayer.push(
						{
							'event': 'select_item',
							'event_id': RenderDatalayer.eventId,
							'ecommerce': {
								'currency': RenderDatalayer.currencyCode,
								'items': [ productClicked ]
							}
						}
					);
				}
			}
		}
	);

	function remove_item(){
		var links = document.querySelectorAll("a[href*='?remove_item']");
		links.forEach(function(link) {
			link.addEventListener('click', function() {
				var id = link.getAttribute("data-product_id");
				var name = link.getAttribute("data-product_name");
				var sku = link.getAttribute("data-product_sku");
				var price = link.getAttribute("data-product_price");
				var category = link.getAttribute("data-product_category");
				var variant = link.getAttribute("data-product_variant");
				var quantity = link.getAttribute("data-product_quantity");
				var brand = link.getAttribute("data-product_brand");
				var idOrSku = RenderDatalayer.idOrSku;
				if (idOrSku=='SKU'){
					id = sku;
				}
				if (RenderDatalayer.datalayerOption == 'UA') {
					dataLayer.push(
						{
							'event': 'removeFromCart',
							'event_id': RenderDatalayer.eventId,
							'ecommerce': {
								'currency': RenderDatalayer.currencyCode,
								'remove': {
									'products': [{
										'name': name,
										'id': id,
										'price': price,
										'brand': brand,
										'category': category,
										'variant': variant,
										'quantity': quantity
									}]
								}
							}
						}
					);
				}
				if (RenderDatalayer.datalayerOption == 'GA4') {
					dataLayer.push( { ecommerce: null } );
					dataLayer.push(
						{
							'event': 'remove_from_cart',
							'event_id': RenderDatalayer.eventId,
							'ecommerce': {
								'currency': RenderDatalayer.currencyCode,
								'items': [{
									'item_id': id,
									'item_name': name,
									'price': price,
									'item_category': category,
									'quantity': quantity,
									'item_brand': brand,
									'item_variant': variant
								}]
							}
						}
					);
				}
			});
		});
	}
	remove_item();
	jQuery( document ).ajaxStop(
		function() {
			remove_item();
		}
	);

	if (RenderDatalayer.checkoutJsEvents) {

		document.body.addEventListener('change', function (e){
			var input_name   = e.target.getAttribute('name');
			var type = e.target.value;
			if( RenderDatalayer.add_shipping_info === 'selected' ){
				if ( input_name.includes('shipping_method') ) {
					add_shipping_info( type );
				}
			}
			if( RenderDatalayer.add_payment_info === 'selected' ){
				if ( input_name === 'payment_method' ) {
					add_payment_info( type );
				}
			}
		});
		document.body.addEventListener('click', function(e) {
			var input_name   = e.target.getAttribute('name')
			if ( input_name === 'woocommerce_checkout_place_order'){
				if( RenderDatalayer.add_shipping_info === 'button' ){
					var checked_shipping_method = document.querySelector('input[name="shipping_method[0]"]:checked');
					if(checked_shipping_method){
						add_shipping_info(checked_shipping_method.value);
					}
				}
				if( RenderDatalayer.add_payment_info === 'button' ){
					var checked_payment_method = document.querySelector('input[name="payment_method"]:checked');
					if(checked_payment_method){
						add_payment_info(checked_payment_method.value);
					}
				}
			}
		});

		function add_payment_info( type ){
			dataLayer.push( { ecommerce: null } );
			dataLayer.push(
				{
					'event': 'add_payment_info',
					'event_id': RenderDatalayer.eventId,
					'ecommerce': {
						'currency': RenderDatalayer.currencyCode,
						'value': RenderDatalayer.value,
						'payment_type': type,
						'items': RenderDatalayer.products
					}
				}
			);
		}

		function add_shipping_info( type ){
			dataLayer.push( { ecommerce: null } );
			dataLayer.push(
				{
					'event': 'add_shipping_info',
					'event_id': RenderDatalayer.eventId,
					'ecommerce': {
						'currency': RenderDatalayer.currencyCode,
						'value': RenderDatalayer.value,
						'shipping_tier': type,
						'items': RenderDatalayer.products
					}
				}
			);
		}
	}
});
