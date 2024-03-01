var uid = false;

function addOnePending(uid)
{
	var pending_tab = $('.modFriend a[href="#sentRequest"]');
	
	var re = /(.*)(\d+)(.*)/
	var match = pending_tab.html().match(re);

	var current = parseInt(match[2]) + 1;
	
	pending_tab.html(match[1] + current + match[3]);
}

/**
 * function sendRequest
 * Aucun paramètre.
 * 
 * Cette fonction valide la demande d'ajout et l'envoi.
 */
function  sendRequest() {
     
    $('.messageArea').fadeOut('fast', function() {
        $(this).prev('.requestSent').fadeIn('fast');
    });
    
	$.post("/global/module/friends/ajax/ajax_friendAdd.php", { 'uid' : $("#uid").val(), 'message' : $(".cartmanMessages").val() }, function(data) { 
		
		$('.friendBlock#' + uid).animate({
			width: 0
		}, 'fast', function() { $(this).remove(); });
		
		uid = false;
		
    	if ($(".searchFriendResult #" + uid).size())
			$(".searchFriendResult #" + uid).fadeOut("slow").remove();
		
		if ($("#sentRequest").size())
			$("#sentRequest div:first").append(data);
		
		initDeleteRequestLink();
		initSendMailLink();
		initShowMessageJoinedLink();
		addOnePending($("#uid").val());
	});
}

function initFriendAddLink()
{
    if( $(".friendBlockAddLink").length ) {
        $(".friendBlockAddLink").unbind("click").click(function() {
            uid = $(this).closest("div").attr("id");
        }); // How to retrieve UID

        $(".friendBlockAddLink").fancybox({
	'scrolling': 'no',	
	onComplete: function() {
                $(".makeButton").each(function() {
                    $(this).button({
                        icons: {
                            primary: $(this).attr("icon"),
                            secondary: $(this).attr("iconRight")
                        },
                        text : $(this).html()
                    }).removeAttr("icon").removeAttr("iconRight").removeClass("makeButton");
                });
            },
            showCloseButton: false
        }); // FancyStyle the link
    }
}

function initFriendBlockDeleteLink()
{
	if ($(".friendBlockDeleteLink").size())
	{
		$(".friendBlockDeleteLink").unbind("click").click(function() {
			if (confirm(polyglot.t("friends.confirm_operation")))
			{
				var idRelation = $(this).closest("div").attr("id").substr(1, $(this).closest("div").attr("id").length - 1);
				$.post("/global/module/friends/ajax/ajax_deleteFriend.php", { 'idRelation' :  idRelation }, function() {
					$("div#F" + idRelation).animate({
						'width': 0
					}, 'fast', function() {
						$(this).remove();
					});
				});
			}
		});
	}
		
}

function initDeleteRequestLink()
{
	$(".friendBlockCancelAdd").unbind("click").click(function() {
		if (confirm(polyglot.t("friends.confirm_delete")))
		{
				var idRequest = $(this).closest("div").attr("id");
				$.post("/global/module/friends/ajax/ajax_friendDeleteRequest.php", { "request" : idRequest }, function() {
					$("div#" + idRequest).animate({
						'width': 0
					}, 'fast', function() { $(this).remove() });
				});		
		}
	});
}

function initRefuseRequestLink()
{
	$(".friendBlockRefuseAdd").unbind("click").click(function() {
		if (confirm(polyglot.t("friends.confirm_refuse")))
		{
			var idRequest = $(this).closest("div").attr("id");
			$.post("/global/module/friends/ajax/ajax_friendRefuseRequest.php", { "request" : idRequest }, function() {
				$("div#" + idRequest).fadeOut("slow").remove();
                location.reload();
                return false;
			});
            
            
		}
	});
}

function initAcceptRequestLink()
{
	$(".friendBlockAcceptAdd").unbind("click").click(function() {
		if (confirm(polyglot.t("friends.confirm_accept")))
		{
			var idRequest = $(this).closest("div").attr("id");
			$.post("/global/module/friends/ajax/ajax_friendAcceptRequest.php", 
					{ "request" : idRequest }, 
					function(data) 
					{
						$("div#" + idRequest).fadeOut("slow").remove();
						$(".friendList").html($(".friendList").html() + data);
						initFriendBlockDeleteLink();
						
						location.reload();
						
						return false;
					}
			);
		}
	});
}

function initSendMailLink()
{
	$(".friendBlockResend").unbind("click").click(function() {
		var idRequest = $(this).closest("div").attr("id");
		$.post("/global/module/friends/ajax/ajax_sendFriendInvitation.php", { 'request' :  idRequest }, function() {
			alert(polyglot.t("friends.reminder_email_send"));
		});	
	});
}

function initSuggestionCloseButton()
{
	$(".friendBlockRejectSuggest").unbind("click").click(function() {
		if (confirm(polyglot.t("friends.confirm_no_add")))
		{
			var idSuggestion = $(this).closest(".friendBlockSuggestion").attr("id").substr(1, $(this).closest(".friendBlockSuggestion").attr("id").length - 1);
			$.post("/global/module/friends/ajax/ajax_FriendCloseSuggestion.php", { 'idSuggestion' : idSuggestion });
			$(this).closest("div.friendBlockSuggestion").slideUp("slow", function() { 
				$(this).remove(); 
				if ($("div.friendBlockSuggestion").size() == 0)
					$(".renewSuggestButton").slideDown(); });
		}
	});
}

function initSuggestionAddButton() {
	$(".friendBlockAddLinkFromSuggestion").unbind("click").click(function() {
        
        if(!$('.addFriendPersonnalMessage').size()) {
            $('body').append("<div class='addFriendPersonnalMessage'><table class='tableau_formulaire'><tr><th valign='top'>"+polyglot.t("friends.add_personal_message")+"</th><td><textarea cols='55' rows='5'></textarea></td></tr></table></div>");
        }
        
		var idSuggestion = $(this).closest(".friendBlockSuggestion").attr("id").substr(1, $(this).closest(".friendBlockSuggestion").attr("id").length - 1);
		
		$(".addFriendPersonnalMessage").find("textarea").val("");
		
		$(".addFriendPersonnalMessage").dialog("destroy");
		$(".addFriendPersonnalMessage").dialog({
			"title" : $(this).attr("title"),
			"width" : 600,
			"buttons" : { [polyglot.t("friends.send_request")] : function() {
				$.post("/global/module/friends/ajax/ajax_friendAddFromSuggestion.php", { 'idSuggestion' : idSuggestion, 'message' : $(this).find('textarea').val() }, function(data) { 
					$(".addFriendPersonnalMessage").dialog("close");
					$("#s" + idSuggestion).slideUp("slow", function() { 
						$(this).remove(); 
						if ($("div.friendBlockSuggestion").size() == 0)
							$(".renewSuggestButton").slideDown(); 
						alert(polyglot.t("friends.find_demand_in_friendslist", {data: data}));
                    });
					
				});
			},
			[polyglot.t("core.cancel")] : function() { $(this).dialog("close"); }}
		});
		$(".renewSuggestButton").slideDown();
	});
}

function getNewSuggest()
{
	$.get("/global/module/friends/ajax/ajax_friendGenerateSuggest.php", {}, function(data) {
		if (data != "")
		{
			$("#noSuggest").remove();
			$("#widgetSuggestContent").html(data).css("height", "340px").css("width" , "100%").css("overflow-y", "scroll").css("overflow-x", "hidden");
			
			initSuggestionCloseButton();
			initSuggestionAddButton();
			
			$('.renewSuggestButton').trigger('done');
		}
		$(".renewSuggestButton").slideUp();
	});
}

function initShowMessageJoinedLink() {
    $('a.friendBlockShowJoinedMessage').each(function() {
        $(this).unbind('click').click(function() {
            $(this).closest('.friendBlock').find('p.joinedMessage').slideDown('fast').delay(1500).slideUp();
        });
    });
}

$(document).ready(function() {
	$(".searchFriend").unbind("click").click(function() {
		$(".searchFriendResult").html('<div class="uiLoader"><i class="fas fa-spinner fa-spin fa-3x fa-fw"></i></div>');
		$.post(
			"/global/module/friends/ajax/ajax_searchFriend.php",
			{
				'nom' : $(this).closest("form").find("#nom").val(),
				'prenom' : $(this).closest("form").find("#prenom").val(),
				'ville' : $(this).closest("form").find("#ville").val(),
				'dept' : $(this).closest("form").find("#dept").val(),
				'pays' : $(this).closest("form").find("#pays").val()
			},
			function(data) {
				$(".searchFriendResult").html(data);
				initFriendAddLink();
			}
		);
		return false;
	});
	
	initFriendBlockDeleteLink();
	initDeleteRequestLink();
	initRefuseRequestLink();
	initAcceptRequestLink();
	initSendMailLink();
	initFriendAddLink();
    initShowMessageJoinedLink();
    initSuggestionCloseButton();
	initSuggestionAddButton();
    
});


function loadRankingFriends(id) {
    if(id) {
        $('#zone_ranking_asso'+id).html("<center><img src='/global/images/ajax-loader.gif'></center>");
        $.post("/global/module/friends/ajax/recupFriendsAjaxNiveau.php", { 'longeur' : id }, function(data) {
			$('#zone_ranking_asso'+id).html(data);
		});
    }
}


function showFriends_niveau(id) {
    if( $('#zone_ranking_asso'+id).length) {
        
        if( $('#zone_ranking_asso'+id).is(':visible') ) {
            $('#zone_ranking_asso'+id).fadeOut();
        } else {
            loadRankingFriends(id);
            $('#zone_ranking_asso'+id).fadeIn();
        }
    }
}
