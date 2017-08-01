<div class="header">
	<div class="left"><?php echo $leftMenu;?></div>
	<div class="center"><?php echo isset($topTitle) ? $topTitle : ''; ?></div>
	<div class="right"><?php echo !isset($_SESSION['hide_menu']) ? $rightMenu : '';?></div>
</div>