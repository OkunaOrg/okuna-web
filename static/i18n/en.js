export default {
    "name": "Okuna",
    "pages": {
        "auth": {
            "title": "Social networking, done good.",
            "usps": {
                "friends": "Meet new friends and discover interests by joining or hosting communities.",
                "privacy": "We don't track nor monitor what you do.",
                "revenue": "We have zero ads and sustain the network through an optional coffee subscription.",
                "mental_health": " With private comments, toggleable follower counts and batch notifications, make your surfing experience, stress-free.",
                "planet": " We are committed to donating a percentage of our profits towards preserving improving our only home."
            }
        },
        "home": {
            "communities": {
                "title": "Communities",
                "favorites": {
                    "title": "Favorites",
                    "see_all_communities": "See all favorite communities",
                },
                "joined": {
                    "see_all_communities": "See all joined communities",
                    "title": "Joined",
                },
                "administrated": {
                    "see_all_communities": "See all administrated communities",
                    "title": "Administrated",
                },
                "moderated": {
                    "see_all_communities": "See all moderated communities",
                    "title": "Moderated",
                },
            }
        }
    },
    "components": {
        "report_object_modal": {
            "why": "Why are you reporting this {objectName}?",
        },
        "post_actions": {

        },

        "post_comments_sort_switcher": {
            "showing": "Showing",
            "first": "first."
        },
        "post_comment": {
            "collapse_replies": "Collapse replies",
            "replies_count": "{repliesCount}+ Replies",
        },
        "post_comments": {
            "load_more": "Load more comments"
        },
        "post_comment_replies": {
            "load_more": "Load more replies"
        },
        "load_more": {
            "status_bar": {
                "load_more": "Load more",
                "loading": "Loading",
                "all_loaded": "Nothing more to load"
            }
        },
        "user_dropdown": {
            "my_okuna": "My Okuna",
            "profile": "Profile",
            "circles": "Circles",
            "lists": "Lists",
            "followers": "Followers",
            "following": "Following",
            "invites": "Invites",
            "moderation_tasks": "Moderation tasks",
            "moderation_penalties": "Moderation penalties",
            "app_and_account": "App & Account",
            "settings": "Settings",
            "themes": "Themes",
            "support_and_feedback": "Support & Feedback",
            "useful_links": "Useful links",
            "logout": "Logout",
        },
        "notifications": {
            "title": "Notifications",
            "general_tab_label": "General",
            "requests_tab_label": "Requests",
            "post_preview_alt_text": "Post preview",
            "user_new_post": "posted something.",
            "community_new_post": "There was a new post in c/{communityName}.",
            "connection_request": "wants to connect with you.",
            "accepted_connection_request": "accepted your connection request.",
            "reacted_to_post": "reacted to your post.",
            "reacted_to_post_comment": "reacted to your post comment.",
            "following_you": "is now following you.",
            "user_community_invite": "has invited you to join community c/{communityName}.",
            "user_replied": "replied: {postCommentText}",
            "user_also_replied": "also replied: {postCommentText}",
            "commented_on_your_post": "commented on your post: {postCommentText}",
            "also_commented": "also commented: {postCommentText}",
            "mentioned_in_post": "mentioned you in a post.",
            "mentioned_in_comment": "mentioned you in a comment: {postCommentText}"
        },
        "user_profile_age": {
            "age_in_years": "{years}y",
            "age_in_weeks": "{weeks}w",
        },
        "user_posts_count": {
            "posts": "Posts",
        },
        "user_following_count": {
            "following": "Following",
        },
        "user_followers_count": {
            "followers": "Followers",
        },
        "community_profile_visibility": {
            "public": "Public",
            "private": "Private",
        },
        "community_posts_count": {
            "posts": "Posts",
        },
        "community_members_count": {
            "members": "Members",
        },
    },
    "forms": {
        "report_object":{
            "provide_additional_details": "Can you provide additional details that might be relevant to the report?",
            "heres_what_happens_next": "Here's what will happen next:",
            "report_submitted_anon": "Your report will be submitted anonymously.",
            "if_reporting_post_or_comment": "If you are reporting a post or comment, the report will be sent to the Okuna staff and the community moderators if applicable and the post will be hidden from your feed.",
            "if_reporting_account_or_community": "If you are reporting an account or community, it will be sent to the Okuna staff.",
            "we_will_review_it": "We'll review it, if approved, content will be deleted and penalties delivered to the people involved ranging from a temporary suspension to deletion of the account depending on the severity of the transgression.",
            "if_report_approved": "If the report is found to be made in an attempt to damage the reputation of another member or community in the platform with no infringement of the stated reason, penalties will be applied to you.",
            "i_understand_submit": "I understand, submit.",
        },
        "login": {
            "or_signup_delimited": "or"
        },
        "comment_post": {
            "placeholder": "Write something...",
            "placeholder_reply": "Your reply...",
            "submit": "Post",
            "submit_reply": "Reply",
            "title": "Comment post",
            "title_reply": "Reply to comment",
        },
    },
    "user_preferences": {
        "link_previews_setting": {
            "always": "Always",
            "never": "Never",
        },
        "hashtag_display_setting": {
            "disco": "Disco",
            "traditional": "Traditional",
        },
        "post_comments_sort_setting": {
            "newest_first": "newest",
            "oldest_first": "oldest"
        },
        "videos_auto_play_setting": {
            "always": "Always",
            "never": "Never"
        },
        "videos_sound_setting": {
            "enabled": "Enabled",
            "disabled": "Disabled"
        }
    },
    "global": {
        "errors": {
            "generic": {
                "forbidden": '🙅‍♀️ You are not allowed to do this.',
                "tooManyRequests": "😥 Too many requests. Please wait a couple minutes until trying again",
                "invalidRequest": '🤔 The request was invalid.',
                "notFound": "👀 Not found",
                "unhandled": "😭 Unhandled error"
            },
            "password": {
                "required": "Password is required",
                "min_length": "Password has to be longer than 10 characters",
                "max_length": "Password has to be smaller than 128 characters"
            },
            "post_comment_text": {
                "required": "Comment is required",
                "max_length": "Text has to be smaller than 5000 characters"
            },
            "moderation_report_description": {
                "max_length": "Description has to be smaller than 1000 characters"
            },
            "username": {
                "required": "Username is required",
                "username": "Username has to be smaller than 64 characters"
            },
            "email": {
                "required": "Email is required",
                "invalid": "Email is invalid",
            }
        },
        "keywords": {
            "email": "E-mail",
            "follow": "Follow",
            "unfollow": "Unfollow",
            "password": "Password",
            "username": "Username",
            "about": "About",
            "manage": "Manage",
            "you": 'You',
            "all": 'All',
            "explore": 'Explore',
            "trending": 'Trending',
            "posts": "posts",
            "search": "Search",
            "hashtag": "Hashtag",
            "hashtags": "Hashtags",
            "community": "Community",
            "communities": "Communities",
            "users": "Users",
            "more": "More",
            "optional": "Optional",
            "description": "description",
            "done": "Done",
            "save": "Save",
        },
        "models": {
            "post": "post",
            "post_comment": "post comment",
            "user": "user",
            "hashtag": "hashtag",
            "community": "community",
            "fallback": "item"
        },
        "snippets": {
            "forgot_password": "Forgot password?",
            "type_here": "Type here...",
            "about_us": "About us",
            "privacy_policy": "Privacy policy",
            "terms_of_use": "Terms of use",
            "dont_have_an_account": "Dont have an account?",
            "sign_up": "Sign up",
            "login": "Login",
            "operational_status": "Status",
            "no_results_for_query": "☹️ No results for \"{query}\"",
            "search_for_something": "🕵️‍♀️ Search for something...",
            "all_loaded": "🎉 All loaded!",
            "no_items_found": "☹️ No items found",
            "delete_post": "Delete post",
            "post_deleted": "Post deleted",
            "post_reported": "Post reported",
            "post_closed": "Post closed",
            "post_opened": "Post opened",
            "report_post": "Report post",
            "close_post": "Close post",
            "open_post": "Open post",
            "disable_post_comments": "Disable post comments",
            "enable_post_comments": "Enable post comments",
            "post_comments_disabled": "Post comments disabled",
            "post_comments_enabled": "Post comments enabled",
            "edit_post": "Edit post",
            "report_user": "Report user",
            "user_reported": "User reported",
            "report_hashtag": "Report hashtag",
            "hashtag_reported": "Hashtag reported",
            "report_community": "Report community",
            "commmunity_reported": "Community reported",
            "block_user": "Block user",
            "user_blocked": "User blocked",
            "unblock_user": "Unblock user",
            "user_unblocked": "User unblocked",
            "confirm_user_connection": "Confirm connection",
            "deny_user_connection": "Deny connection",
            "disconnect_from_user": "Disconnect from user",
            "disconnected_from_user": "You have been disconnected from this user",
            "user_connection_confirmed": "Connection confirmed",
            "connect_with_user": "Connect with user",
            "connection_request_sent": "Connection request sent",
            "add_connection_to_circle": "Add connection to circle",
            "update_connection_circles": "Update connection circles",
            "connection_circles_updated": "Connection circles updated",
            "cancel_connection_request": "Cancel connection request",
            "request_to_follow": "Request to follow",
            "cancel_request_to_follow": "Cancel request to follow",
            "delete_post_comment": "Delete post comment",
            "post_comment_deleted": "Post comment deleted",
            "report_post_comment": "Report post comment",
            "post_comment_reported": "Post comment reported"
        },
    },
}
