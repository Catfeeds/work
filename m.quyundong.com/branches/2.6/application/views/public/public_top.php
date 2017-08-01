<div class="header fontfamily">
		<div class="left"><?php echo $leftMenu;?></div>
			<div class="center"><h1><?php echo isset($topTitle) ? $topTitle : ''; ?></h1></div>
			<div class="right mr10">
            <?php echo !isset($_SESSION['hide_menu']) ? $rightMenu : '';?>
            </div>
</div>