/************************
    Workflow widget
*/
var workflow;
var workflowModule = new Object();
var workflowStepModule = new Object();
var LeafWorkflow = function (containerID, CSRFToken) {
  var containerID = containerID;
  var CSRFToken = CSRFToken;
  var prefixID = "LeafFlow" + Math.floor(Math.random() * 1000) + "_";
  var htmlFormID = prefixID + "record";
  var dialog;
  var currRecordID = 0;
  var postModifyCallback;
  var antiDblClick = 0;
  var actionPreconditionFunc;
  var actionSuccessCallback;
  var rootURL = "";

  /**
   * @memberOf LeafWorkflow
   */
  function darkenColor(color) {
    bgColor = parseInt(color.substring(1), 16);
    r = (bgColor & 0xff0000) >> 16;
    g = (bgColor & 0x00ff00) >> 8;
    b = bgColor & 0x0000ff;

    factor = -0.1;
    r = r + Math.round(r * factor);
    g = g + Math.round(g * factor);
    b = b + Math.round(b * factor);

    return "#" + ((r << 16) + (g << 8) + b).toString(16);
  }

  /**
   * @memberOf LeafWorkflow
   */
  function applyAction(data) {
    if (antiDblClick == 1) {
      return 1;
    } else {
      antiDblClick = 1;
    }

    // Check if CSRFToken has Changed (Timeout Fix)
    $.ajax({
      type: "GET",
      url: rootURL + "api/formWorkflow/getCSRFToken",
      async: false,
      success: function (res) {
        data.CSRFToken = res;
      },
      error: function (err) {
        alert("Session Expired");
      },
    });

    $("#workflowbox_dep" + data["dependencyID"]).html(
      '<div style="border: 2px solid black; text-align: center; font-size: 24px; font-weight: bold; background: white; padding: 16px; width: 95%">Applying action... <img src="' +
        rootURL +
        'images/largespinner.gif" alt="loading..." /></div>'
    );
    $.ajax({
      type: "POST",
      url: rootURL + "api/formWorkflow/" + currRecordID + "/apply",
      data: data,
      success: function (response) {
        if (response !== "Invalid Token.") {
          if (response.errors.length === 0) {
            $("#workflowbox_dep" + data["dependencyID"]).html(
              '<div style="border: 2px solid black; text-align: center; font-size: 24px; font-weight: bold; background: white; padding: 16px; width: 95%">Action applied!</div>'
            );
            $("#workflowbox_dep" + data["dependencyID"]).hide("blind", 500);

            getWorkflow(currRecordID);
            if (actionSuccessCallback !== undefined) {
              actionSuccessCallback();
            }

            let new_note;
            new_note =
              '<div class="comment_block"> <span class="comments_time"> ' +
              response.comment.date +
              '</span> <span class="comments_name">' +
              response.comment.responder +
              " " +
              response.comment.user_name +
              '</span> <div class="comments_message">' +
              response.comment.comment +
              "</div> </div>";

            if (response.comment.comment != "") {
              $(new_note).insertAfter("#notes");
            }

            if ($("#comments").css("display") == "none") {
              $("#comments").css("display", "block");
            }

            if (response.comment.nextStep == 0) {
              $("#notes").css("display", "none");
              if (!$(".comment_block")[0]) {
                $("#comments").css({ display: "none" });
              }
            } else {
              $("#notes").css("display", "block");
            }
          } else {
            var errors = "";
            for (var i in response.errors) {
              errors += response.errors[i] + "<br />";
            }
            $("#workflowbox_dep" + data["dependencyID"]).html(
              '<div style="border: 2px solid black; text-align: center; font-size: 24px; font-weight: bold; background: white; padding: 16px; width: 95%"><img src="' +
                rootURL +
                'dynicons/?img=dialog-error.svg&w=48" style="vertical-align: middle" alt="error icon" /> ' +
                errors +
                '<br /><span style="font-size: 14px; font-weight: normal">After resolving the errors, <button id="workflowbtn_tryagain" class="buttonNorm">click here to try again</button>.</span></div>'
            );
            $("#workflowbtn_tryagain").on("click", function () {
              getWorkflow(currRecordID);
            });
          }
        } else {
          $("#workflowbox_dep" + data["dependencyID"]).html(
            '<div style="border: 2px solid black; text-align: center; font-size: 24px; font-weight: bold; background: white; padding: 16px; width: 95%"><img src="' +
              rootURL +
              'dynicons/?img=dialog-error.svg&w=48" style="vertical-align: middle" alt="error icon" />Session has expired.<br /><span style="font-size: 14px; font-weight: normal"><button id="workflowbtn_tryagain" class="buttonNorm">Click here to try again</button></span></div>'
          );
          $("#workflowbtn_tryagain").on("click", function () {
            getWorkflow(currRecordID);
            setTimeout(function () {
              $("#comment_dep" + data.dependencyID).val(data.comment);
            }, 1000);
          });
        }

        antiDblClick = 0;
      },
      error: function (response) {
        console.log(response);
        if (data["dependencyID"] === null) {
          $("#workflowbox_dep" + data["dependencyID"]).html(
            '<div style="border: 2px solid black; text-align: center; font-size: 24px; font-weight: bold; background: white; padding: 16px; width: 95%">Error: Requirement from current step is missing<br/> Please contact administrator to add requirement to current step</div>'
          );
        } else {
          $("#workflowbox_dep" + data["dependencyID"]).html(
            '<div style="border: 2px solid black; text-align: center; font-size: 24px; font-weight: bold; background: white; padding: 16px; width: 95%">Error: Workflow Events may not have triggered</div>'
          );
        }
      },
    });
  }

  /**
   * @memberOf LeafWorkflow
   */
  var modulesLoaded = {};
  function drawWorkflow(step) {
    // draw frame and header
    var stepDescription =
      step.description == null
        ? "Your workflow is missing a requirement. Please check your workflow."
        : step.description;

    $("#" + containerID).append(
      '<div id="workflowbox_dep' +
        step.dependencyID +
        '" class="workflowbox">\
                <span>\
                <div id="stepDescription_dep' +
        step.dependencyID +
        '" style="background-color: ' +
        darkenColor(step.stepBgColor) +
        '; padding: 8px">' +
        stepDescription +
        '</div>\
                </span>\
                <form id="form_dep' +
        step.dependencyID +
        '" enctype="multipart/form-data" action="#">\
                    <div id="form_dep_extension' +
        step.dependencyID +
        '"></div>\
                </form>\
                </div>'
    );
    $("#workflowbox_dep" + step.dependencyID).css({
      padding: "0px",
      "background-color": step.stepBgColor,
      border: step.stepBorder,
    });
    $("#workflowbox_dep" + step.dependencyID + " span").css({
      "font-size": "120%",
      "font-weight": "bold",
      color: step.stepFontColor,
    });

    // draw comment area and button anchors
    $("#form_dep" + step.dependencyID).append(
      '<div id="form_dep_container' +
        step.dependencyID +
        '">\
                <span class="noprint" aria-label="comments">Comments:</span><br />\
                <textarea id="comment_dep' +
        step.dependencyID +
        '" aria-label="comment text area"></textarea>\
                </div>'
    );
    $("#form_dep_container" + step.dependencyID).css({
      margin: "auto",
      width: "95%",
      padding: "8px 0",
    });

    $("#comment_dep" + step.dependencyID).css({
      height: "40px",
      width: "100%",
      padding: "4px",
      resize: "vertical",
    });

    //add alignment area for buttons
    $("#form_dep_container" + step.dependencyID).append(
      `<div class="action_button_container" style="display:flex; justify-content:space-between">
        <div class="actions_alignment_left" style="display:flex; flex-wrap:wrap;"></div>
        <div class="actions_alignment_right" style="display:flex; flex-wrap:wrap; justify-content:flex-end"></div>
      </div>`
    );
    console.log(step);
    // draw buttons
    for (let i in step.dependencyActions) {
      const icon =
        step.dependencyActions[i].actionIcon != ""
          ? `<img src="${rootURL}dynicons/?img=${step.dependencyActions[i].actionIcon}&amp;w=22"
            alt="${step.dependencyActions[i].actionText}" style="vertical-align: middle" />`
          : "";
      const alignment = step.dependencyActions[i].actionAlignment.toLowerCase();

      $(
        `#form_dep_container${step.dependencyID} .actions_alignment_${alignment}`
      ).append(
        `<div id="button_container${step.dependencyID}_${step.dependencyActions[i].actionType}">
          <button type="button" id="button_step${step.dependencyID}_${step.dependencyActions[i].actionType}" class="button">
            ${icon} ${step.dependencyActions[i].actionText}
          </button>
        </div>`
      );

      $(
        `#button_step${step.dependencyID}_${step.dependencyActions[i].actionType}`
      ).css({ border: "1px solid black", padding: "6px", margin: "4px" });

      $(
        "#button_step" +
          step.dependencyID +
          "_" +
          step.dependencyActions[i].actionType
      ).on("click", { step: step, idx: i }, function (e) {
        var data = new Object();
        data["comment"] = $("#comment_dep" + e.data.step.dependencyID).val();
        data["actionType"] =
          e.data.step.dependencyActions[e.data.idx].actionType;
        data["dependencyID"] = e.data.step.dependencyID;

        var completeAction = function () {
          data["CSRFToken"] = CSRFToken;
          if (e.data.step.dependencyActions[e.data.idx].fillDependency > 0)
            if (
              typeof workflowModule[e.data.step.dependencyID] !== "undefined"
            ) {
              workflowModule[e.data.step.dependencyID].trigger(function () {
                applyAction(data);
              });
            } else if (
              typeof workflowStepModule[e.data.step.stepID] !== "undefined"
            ) {
              var actionTriggered = false;
              for (var i in workflowStepModule[e.data.step.stepID]) {
                if (
                  typeof workflowStepModule[e.data.step.stepID][i].trigger !==
                  "undefined"
                ) {
                  actionTriggered = true;
                  workflowStepModule[e.data.step.stepID][i].trigger(
                    function () {
                      applyAction(data);
                    }
                  );
                  break;
                }
              }
              if (!actionTriggered) {
                applyAction(data);
              }
            } else {
              applyAction(data);
            }
          else {
            applyAction(data);
          }
        };

        if (actionPreconditionFunc !== undefined) {
          actionPreconditionFunc(e.data, completeAction);
        } else {
          completeAction();
        }
      });
    }

    // load workflowStep modules
    if (step.requiresDigitalSignature == true) {
      $.ajax({
        type: "GET",
        url:
          rootURL +
          "ajaxScript.php?a=workflowStepModules&s=LEAF_digital_signature&stepID=" +
          step.stepID,
        dataType: "script",
        success: function () {
          workflowStepModule[step.stepID].LEAF_digital_signature.init(
            step,
            rootURL
          );
        },
        fail: function (err) {
          console.log("Error: " + err);
        },
      });
    }
    if (step.stepModules != undefined) {
      for (var x in step.stepModules) {
        if (
          modulesLoaded[step.stepModules[x].moduleName + "_" + step.stepID] ==
          undefined
        ) {
          modulesLoaded[step.stepModules[x].moduleName + "_" + step.stepID] = 1;
          $(`#form_dep_extension${step.dependencyID}`)
            .html(`<div style="padding: 8px 24px 8px">
                        <div style="background-color: white; border: 1px solid black; padding: 16px">
                            <h2>Loading...</h2>
                        </div>
                        </div>`);
          $(`#form_dep_container${step.dependencyID} .button`).attr(
            "disabled",
            true
          );
          $.ajax({
            type: "GET",
            url:
              rootURL +
              "ajaxScript.php?a=workflowStepModules&s=" +
              step.stepModules[x].moduleName +
              "&stepID=" +
              step.stepID,
            dataType: "script",
            success: function () {
              workflowStepModule[step.stepID][
                step.stepModules[x].moduleName
              ].init(step, rootURL);
              $(`#form_dep_container${step.dependencyID} .button`).attr(
                "disabled",
                false
              );
            },
            fail: function (err) {
              console.log("Error: " + err);
            },
          });
        }
      }
    }

    // legacy workflow modules based on dependencyIDs
    for (var u in step.jsSrcList) {
      $.ajax({
        type: "GET",
        url: rootURL + step.jsSrcList[u],
        dataType: "script",
        success: function () {
          workflowModule[step.dependencyID].init(currRecordID, rootURL);
        },
        fail: function (err) {
          console.log("Error: " + err);
        },
      });
    }
  }

  /**
   * @memberOf LeafWorkflow
   */
  function drawWorkflowNoAccess(step) {
    // hide cancel button since the user doesn't have access
    //        $('#btn_cancelRequest').css('display', 'none');

    $("#" + containerID).append(
      '<div id="workflowbox_dep' +
        step.dependencyID +
        '" class="workflowbox"></div>'
    );
    $("#workflowbox_dep" + step.dependencyID).css({
      "background-color": step.stepBgColor,
      border: step.stepBorder,
      "text-align": "center",
      padding: "8px",
    });
    // dependencyID -1 : special case for person designated by the requestor
    if (step.dependencyID == -1) {
      $.ajax({
        type: "GET",
        url:
          rootURL +
          "api/form/customData/_" +
          currRecordID +
          "/_" +
          step.indicatorID_for_assigned_empUID,
        success: function (res) {
          let name = "";

          if (
            res[currRecordID]["s1"][
              "id" + step.indicatorID_for_assigned_empUID
            ] == null
          ) {
            name =
              "Warning: User not selected for currennt action (Contact Administrator)";
          } else {
            name =
              "Pending action from " +
              res[currRecordID]["s1"][
                "id" + step.indicatorID_for_assigned_empUID
              ];
          }

          $("#workflowbox_dep" + step.dependencyID).append(
            "<span>" + name + "</span>"
          );
          $("#workflowbox_dep" + step.dependencyID + " span").css({
            "font-size": "150%",
            "font-weight": "bold",
            color: step.stepFontColor,
          });
        },
        fail: function (err) {
          console.log("Error: " + err);
        },
      });
    } else if (step.dependencyID == -3) {
      // dependencyID -3 : special case for group designated by the requestor
      $.ajax({
        type: "GET",
        url:
          rootURL +
          "api/form/customData/_" +
          currRecordID +
          "/_" +
          step.indicatorID_for_assigned_groupID,
        success: function (res) {
          let name = "";

          if (step.description == null) {
            name =
              "Warning: Group not selected for current action (Contact Administrator)";
          } else {
            name = "Pending action from " + step.description;
          }

          $("#workflowbox_dep" + step.dependencyID).append(
            "<span>" + name + "</span>"
          );
          $("#workflowbox_dep" + step.dependencyID + " span").css({
            "font-size": "150%",
            "font-weight": "bold",
            color: step.stepFontColor,
          });
        },
        fail: function (err) {
          console.log("Error: " + err);
        },
      });
    } else {
      $("#workflowbox_dep" + step.dependencyID).append(
        "<span>Pending " + step.description + "</span>"
      );
      $("#workflowbox_dep" + step.dependencyID + " span").css({
        "font-size": "150%",
        "font-weight": "bold",
        color: step.stepFontColor,
      });
    }
  }

  /**
   * @memberOf LeafWorkflow
   */
  function getLastAction(recordID, res) {
    $.ajax({
      type: "GET",
      url: rootURL + "api/formWorkflow/" + recordID + "/lastActionSummary",
      dataType: "json",
      success: function (lastActionSummary) {
        response = lastActionSummary.lastAction;
        if (response == null) {
          if (res == null) {
            $("#" + containerID).append("No actions available");
          }
          return null;
        }
        response.stepBgColor =
          response.stepBgColor == null ? "#e0e0e0" : response.stepBgColor;
        response.stepFontColor =
          response.stepFontColor == null ? "#000000" : response.stepFontColor;
        response.stepBorder =
          response.stepBorder == null ? "1px solid black" : response.stepBorder;
        var label =
          response.dependencyID == 5
            ? response.categoryName
            : response.description;
        if (res != null) {
          if (response.dependencyID != 5) {
            $("#" + containerID).append(
              '<div id="workflowbox_lastAction" class="workflowbox" style="padding: 0px; margin-top: 8px"></div>'
            );
            $("#workflowbox_lastAction").css({
              "background-color": response.stepBgColor,
              border: response.stepBorder,
            });
          }

          var date = new Date(response.time * 1000);

          var text = "";
          if (response.description != null && response.actionText != null) {
            text =
              '<div style="background-color: ' +
              darkenColor(response.stepBgColor) +
              '; padding: 4px"><span style="float: left; font-size: 90%">' +
              label +
              ": " +
              response.actionTextPasttense +
              "</span>";
            text +=
              '<span style="float: right; font-size: 90%">' +
              date.toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }) +
              "</span><br /></div>";
            if (response.comment != "" && response.comment != null) {
              text +=
                '<div style="font-size: 80%; padding: 4px 8px 4px 8px">Comment:<br /><div style="font-weight: normal; padding-left: 16px; font-size: 12px">' +
                response.comment +
                "</div></div>";
            }
          } else {
            text =
              "[ Please refer to this request's history for current status ]";
          }

          if (response.dependencyID != 5) {
            $("#workflowbox_lastAction").append(
              '<span style="font-weight: bold; color: ' +
                response.stepFontColor +
                '">' +
                text +
                "</span>"
            );
          }
        } else {
          $("#workflowcontent").append(
            '<div id="workflowbox_lastAction"></div>'
          );
          $("#workflowbox_lastAction").css({
            "background-color": response.stepBgColor,
            border: response.stepBorder,
            "text-align": "center",
            padding: "0px",
          });
          $("#workflowbox_lastAction").addClass("workflowbox");

          var date = new Date(response.time * 1000);

          var text = "";
          if (response.description != null && response.actionText != null) {
            text =
              '<div style="padding: 4px; background-color: ' +
              darkenColor(response.stepBgColor) +
              '">' +
              label +
              ": " +
              response.actionTextPasttense;
            text +=
              '<br /><span style="font-size: 60%">' +
              date.toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }) +
              "</span></div>";
            if (response.comment != "" && response.comment != null) {
              text +=
                '<div style="padding: 4px 16px"><fieldset style="border: 1px solid black"><legend class="noprint">Comment</legend><span style="font-size: 80%; font-weight: normal">' +
                response.comment +
                "</span></fieldset></div>";
            }
          } else {
            text =
              "[ Please refer to this request's history for current status. ]";
          }

          $("#workflowbox_lastAction").append(
            '<span style="font-size: 150%; font-weight: bold", color: ' +
              response.stepFontColor +
              ">" +
              text +
              "</span>"
          );
        }

        // check signatures
        if (lastActionSummary.signatures.length > 0) {
          $("#workflowcontent").append(
            '<div id="workflowSignatureContainer" style="margin-top: 8px"></div>'
          );
          for (var i in lastActionSummary.signatures) {
            var sigTime = new Date(
              lastActionSummary.signatures[i].timestamp * 1000
            );
            var month = sigTime.getMonth() + 1;
            var date = sigTime.getDate();
            var year = sigTime.getFullYear();
            $("#workflowSignatureContainer").append(
              '<div style="float: left; width: 30%; margin: 0 4px 4px 0; padding: 8px; background-color: #d1ffcc; border: 1px solid black; text-align: center">' +
                lastActionSummary.signatures[i].stepTitle +
                ' - Digitally signed<br /><span style="font-size: 140%; line-height: 200%"><img src="' +
                rootURL +
                'dynicons/?img=application-certificate.svg&w=32" style="vertical-align: middle; padding-right: 4px" alt="digital signature (beta) logo" />' +
                lastActionSummary.signatures[i].name +
                " " +
                month +
                "/" +
                date +
                "/" +
                year +
                '</span><br /><span aria-hidden="true" style="font-size: 75%">x' +
                lastActionSummary.signatures[i].signature.substr(0, 32) +
                "</span></div>"
            );
          }
          for (var i in lastActionSummary.stepsPendingSignature) {
            $("#workflowSignatureContainer").append(
              '<div style="float: left; width: 30%; margin: 0 4px 4px 0; padding: 8px; background-color: white; border: 1px dashed black; text-align: center">' +
                lastActionSummary.stepsPendingSignature[i] +
                '<br /><span style="font-size: 140%; line-height: 300%">X&nbsp;______________</span></div>'
            );
          }
          $("#workflowcontent").append('<br style="clear: both" />');
        }
      },
      fail: function (err) {
        console.log("Error: " + err);
      },
      cache: false,
    });
  }

  /**
   * @memberOf LeafWorkflow
   */
  function getWorkflow(recordID) {
    $("#" + containerID).empty();
    $("#" + containerID).css("display", "none");
    antiDblClick = 0;
    currRecordID = recordID;

    var masquerade = "";
    if (window.location.href.indexOf("masquerade=nonAdmin") != -1) {
      masquerade = "?masquerade=nonAdmin";
    }

    return $.ajax({
      type: "GET",
      url:
        rootURL + "api/formWorkflow/" + recordID + "/currentStep" + masquerade,
      dataType: "json",
      success: function (res) {
        for (var i in res) {
          if (res[i].hasAccess == 1) {
            drawWorkflow(res[i]);
          } else {
            drawWorkflowNoAccess(res[i]);
          }
        }
        getLastAction(recordID, res);
        $("#" + containerID).show("blind", 250);
      },
      fail: function (err) {
        console.log("Error: " + err);
      },
      cache: false,
    });
  }

  /**
   * @memberOf LeafWorkflow
   */
  function setActionSuccessCallback(func) {
    actionSuccessCallback = func;
  }

  /**
   * @memberOf LeafWorkflow
   * func should accept 2 arguments:
   *     data - {
   *                 idx: index matching the current action for data.step.dependencyActions[]
   *                 step: data related to the current step
   *               }
   *     completeAction - to be executed in order to complete the workflow action
   */
  function setActionPreconditionFunc(func) {
    actionPreconditionFunc = func;
  }

  return {
    getWorkflow: getWorkflow,
    setActionPreconditionFunc: setActionPreconditionFunc,
    setActionSuccessCallback: setActionSuccessCallback,
    setRootURL: function (url) {
      rootURL = url;
    },
  };
};
