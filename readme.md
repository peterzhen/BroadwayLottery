# Broadway Lottery

[Link](https://chrome.google.com/webstore/detail/broadway-lottery/nilchoahomhfoiponkeakmholplfagoo)

Broadway Lottery is a small chrome extension that helps speeds up the tedious process of signing up for your favorite New York City Broadway Show lotteries.  

## Libraries

Broadway Lottery uses these libraries and frameworks:
* `JQuery 3.2.1`
* `Materialize`
* `chrome.storage`

In this chrome extension, I leveraged `Materialize` and `JQuery` to style and provide smooth, responsive user interface.  `JQuery` and  `chrome.storage` are used to manipulate the DOM for persistent storage for later sessions.

## How It Works

Broadway Lottery uses Chrome's built in `chrome.storage` to leverage persistent storage and store a user's profile to pre fill forms for quicker sign ups.  Upon first use, click on the `Edit Profile` button to input your information.  Validation is done using `regex` and DOM manipulation for the form is done with `JQuery`:

```javascript
if (!/^[a-zA-Z ]{2,30}$/.test(formElements.firstName.val())) {
    showError("Enter a valid first name");
    formElements.firstName.css("borderColor", "#F44336");
    return false;
} else {
    formElements.firstName.css("borderColor", "#4CAF50");
}
```
![](assets/profile-gif.gif)

## Selecting Shows

With the form filled out and saved, simply choose the selected shows and click the `Open Selected` button.  This opens the `URL` for the Broadway Lottery entry page in new tabs.  If there is an entry available, the extension will automatically click on the `Enter Now` button.  The form will automatically fill with your preset data.  To finish the lottery submission, visit each tab to complete the Captcha and submit.  You will be notified of your results in your email.

![](assets/select-shows-gif.gif)

## Future Updates

* Opening tabs without a valid lottery entry wastes time.  To counter that, a future feature would be to check if the new show tab would contain a valid entry.  If not, the tab would close, leaving you only with valid tabs open.
* Multiple profiles
