<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/bootstrap.min.css">
    <link rel="stylesheet" href="style/main.css">
    <title>Bible App</title>
</head>

<body class="bg-secondary">
    <hr>
    <form id="the_form">
        <label for="bible">Bible Translation</label>
        <select name="bible" id="bible">
            <option value="empty">Select</option>
        </select>
        <label for="book">Book</label>
        <select name="book" id="book">
            <option value="empty">Select</option>
        </select>
        <label for="chapter">Chapter</label>
        <select name="chapter" id="chapter">
            <option value="empty">Select</option>
        </select>
        <label for="verse">Verse</label>
        <select name="verse" id="verse">
            <option value="empty">Select</option>
        </select>
        <input type="submit" value="Submit">
    </form>
    <p class="copy_right"></p>
    <p class="year"></p>
    <hr>
    <div class="show_stuff">

    </div>

    <script src="/scripts/bootstrap.bundle.min.js"></script>
    <script src="/scripts/script.js"></script>
</body>

</html>