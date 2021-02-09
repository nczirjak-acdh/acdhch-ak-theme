$(document).ready(function () {
    // AK: Initialize popover for entity facts (see data-authors.phtml)
    // Popover documentation          : https://getbootstrap.com/docs/3.4/javascript/#popovers
    // Example for entity facts       : https://hub.culturegraph.org/entityfacts/118540238
    // Entity Facts JSON documentation: https://wiki.dnb.de/pages/viewpage.action?pageId=134055670

    // TODO: Check for accessibility (WCAG / ARIA)

    var popoverEntityFactsTemplate = '<div class="popover popover-entity-facts" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';
    $('[data-toggle="popover-entity-facts"]').popover({
        html: true,
        placement: 'left',
        container: '.mainbody',
        template: popoverEntityFactsTemplate,
        content: function() {
            var $ef = $(this);
            var authId = $(this).data('auth-id');
            
            $.ajax({
				url: 'https://hub.culturegraph.org/entityfacts/'+encodeURIComponent(authId),
				cache: false,
                dataType: 'json',
                timeout: 5000,
                statusCode: {
					// No info was found:
					404: function() {
                        var popoverId = $ef.attr('aria-describedby');
                        $('#' + popoverId + ' .popover-content').html('<strong><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> '+escapeHtml(VuFind.translate('notfound'))+'</strong>');
				    }
                },
                success: function(result) {
                    // General information
                    var preferredName = result.preferredName ?? '';

                    // Person information
                    //var variantNames = result.variantName ?? null; // TODO: Variant names could be too much information (example: Karl Marx) - maybe use a "show more" button?
                    var pseudonyms = getPrefNames(result.pseudonym);
                    var realIdentities = getPrefNames(result.realIdentity);
                    var dateOfBirth = (result.dateOfBirth != undefined) ? [result.dateOfBirth] : [];
                    var placesOfBirth = getPrefNames(result.placeOfBirth);
                    var dateOfDeath = (result.dateOfDeath != undefined) ? [result.dateOfDeath] : [];
                    var placesOfDeath = getPrefNames(result.placeOfDeath);
                    var genderLabel = (result.gender != undefined) ? result.gender.label : null;
                    //var gender = VuFind.translate('unknown');
                    var gender = [];
					if (genderLabel != null) {
						if (genderLabel == 'Mann' || genderLabel == 'mann') {
							gender = [VuFind.translate('male')];
						} else if (genderLabel == 'Frau' || genderLabel == 'frau') {
							gender = [VuFind.translate('female')];
						} else {
                            gender = [VuFind.translate('unknown')];
                        }
                    }
                    var academicDegrees = result.academicDegree ?? null;
                    var titlesOfNobility = result.titleOfNobility ?? null;
                    var affiliations = getPrefNames(result.affiliation);
                    var placesOfActivity = getPrefNames(result.placeOfActivity);
					var occupations = getPrefNames(result.professionOrOccupation);
                    var biographicalOrHistoricalInformation = (result.biographicalOrHistoricalInformation != undefined)
                        ? [result.biographicalOrHistoricalInformation]
                        : null;

                    // Corporation information
                    var datesOfEstablishment = result.dateOfEstablishment ?? null;
                    var datesOfTermination = result.dateOfTermination ?? null;
                    var placesOfBusiness = getPrefNames(result.placeOfBusiness);
                    var isPartOf = getPrefNames(result.isPartOf);
                    var founders = getPrefNames(result.founder);
                    var isA = getPrefNames(result.isA);
                    var homepages = result.homepage ?? null;
                    var relatedOrganisations = getPrefNames(result.relatedOrganisation);
                    var topics = getPrefNames(result.topic);
                    var predecessors = getPrefNames(result.predecessor);
                    var successors = getPrefNames(result.successor);
                    var sameAs = result.sameAs ?? null;

                    // Create the HTML for the popover content
                    var html = '<table>';
                    html += getTr('preferredName', [preferredName]);
                    html += getTr('pseudonyms', pseudonyms, '; ');
                    html += getTr('realIdentities', realIdentities, '; ');
                    html += getTr('dateOfBirth', dateOfBirth);
                    html += getTr('placesOfBirth', placesOfBirth);
                    html += getTr('dateOfDeath', dateOfDeath);
                    html += getTr('placesOfDeath', placesOfDeath);
                    html += getTr('gender', gender);
                    html += getTr('academicDegrees', academicDegrees);
                    html += getTr('titlesOfNobility', titlesOfNobility);
                    html += getTr('placesOfActivity', placesOfActivity);
                    html += getTr('affiliations', affiliations);
                    html += getTr('occupations', occupations);
                    html += getTr('biographicalOrHistoricalInformation', biographicalOrHistoricalInformation);
                    html += getTr('isA', isA);
                    html += getTr('founders', founders);
                    html += getTr('datesOfEstablishment', datesOfEstablishment);
                    html += getTr('datesOfTermination', datesOfTermination);
                    html += getTr('placesOfBusiness', placesOfBusiness);
                    html += getTr('topics', topics);
                    html += getTr('isPartOf', isPartOf);
                    html += getTr('predecessors', predecessors);
                    html += getTr('successors', successors);
                    html += getTr('relatedOrganisations', relatedOrganisations);
                    if (typeof homepages !== undefined && homepages !== null && homepages.length > 0) {
                        html += '<tr><th>'+escapeHtml(VuFind.translate('homepages'))+':</th><td>';
                        for (i in homepages) {
                            var homepage = homepages[i];
                            html += '<a href="'+encodeURI(homepage)+'" target="_blank">'+escapeHtml(homepage)+'</a><br />';
                        }
                        html += '</td></tr>';
                    }
                    if (typeof sameAs !== undefined && sameAs !== null && sameAs.length > 0) {
                        html += '<tr><th>'+escapeHtml(VuFind.translate('sameAs'))+':</th><td>';
                        
                        for (i in sameAs) {
                            var samea = sameAs[i];
                            html += '<a href="'+encodeURI(samea["@id"])+'" target="_blank">'+escapeHtml(samea.collection.name)+'</a><br />';
                        }
                        html += '</td></tr>';
                    }
                    
                    html += '</table>';

                    // Add the html to the right popover
                    var popoverId = $ef.attr('aria-describedby');
                    $('#' + popoverId + ' .popover-content').html(html);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    var popoverId = $ef.attr('aria-describedby');
                    $('#' + popoverId + ' .popover-content').html('<strong><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> '+escapeHtml(VuFind.translate('serviceError'))+'</strong>');
                }
            });

            // Show loading spinner (default)
            return '<i class="fa fa-spinner fa-pulse fa-2x"></i>';
        }
    });
});

function getPrefNames(input) {
    var output = [];
    if (input != undefined && input != null) {
        for (i in input) {
            output.push(input[i].preferredName);
        }
    }
    return output;
}

function getTr(heading, array, joinChar = ', ') {
    if (typeof array !== undefined && array !== null && array.length > 0) {
        var joinedArray = array.join(joinChar);
        return '<tr><th>'+escapeHtml(VuFind.translate(heading))+':</th><td>'+escapeHtml(joinedArray)+'</td></tr>';
    }
    return '';
}
  
function escapeHtml (string) {
    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}
