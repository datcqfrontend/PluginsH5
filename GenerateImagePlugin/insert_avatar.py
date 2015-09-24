def insert_avatar(**kwargs):
    """
    @input['img_bg', 'fb_list', 'filename_output', 'type_sharp']
    @output: filepath
    @usage: detect transparent space and paste fb-avatar to them.
    """
    TYPE_CIRCLE = 0
    TYPE_SQUARE = 1
    MEDIA_PATH = os.path.join(settings.MEDIA_ROOT, "facebook_games")

    if not os.path.exists(MEDIA_PATH):
        os.mkdir(MEDIA_PATH)

    img_bg = kwargs.get('img_bg', "bg-avatar.png")
    default_fb_avatar = kwargs.get('default_fb_avatar', os.path.join(MEDIA_PATH, "ava-fb-default.png"))
    fb_list = kwargs.get('fb_list', default_fb_avatar)
    filename_output = kwargs.get('filename_output', os.path.join(MEDIA_PATH, "test-result.png"))
    type_sharp = kwargs.get('type_sharp', TYPE_CIRCLE)
    font_size = kwargs.get('font_size', None) or 14
    font_color = kwargs.get('font_color', None) or "000000"
    write_text = kwargs.get('write_text', None)

    try:
        try:
            img = Image.open(os.path.join(settings.MEDIA_ROOT, img_bg))
        except:
            raise Exception('Must have a base exist image')

        datas = img.getdata()
        width, height = img.size
        position = []
        x = 0
        y = 0

        # find and store transparent position
        for pixel in datas:
            if pixel[3] < 255:
                position.append((x, y))
            x += 1
            if x == width:
                x = 0
                y += 1

        square_objects = []
        old_y_point = None
        processing_point = False
        x_start_point = None

        """ implement: return list sharp ['top-left-position', 'segment']
        1. to check a point inside a sharp
        2. to detect position paste fb-avatar
        """
        for point in position:
            old_y_point = point[1] - 1;
            if check_point_exist_in_other_square(point, square_objects):
                continue

            # find top-center position of a sharp
            if not processing_point:
                # case circle
                if type_sharp == TYPE_CIRCLE:
                    for xx in range(point[0], width):
                        if not x_start_point:
                            x_start_point = point[0]
                        if not (xx + 1, point[1]) in position:
                            processing_point = (x_start_point + int((xx - x_start_point) / float(2)), point[1])
                            break
                # case square
                else:
                    processing_point = point

            else:
                y_start_point = processing_point[1]
                for sy in range(processing_point[1], height):

                    if sy - old_y_point == 1 :
                        if (processing_point[0], sy) in position:
                            old_y_point = sy
                    else:
                        y_end_point = old_y_point
                        segment = int((y_end_point - y_start_point) / float(2))
                        if segment != 0:
                            # case circle
                            if type_sharp == TYPE_CIRCLE:
                                square_objects.append({'segment': segment, 'left_top_point': (processing_point[0] - segment, processing_point[1])})
                            else:
                                square_objects.append({'segment': segment, 'left_top_point': processing_point})

                            # reset processing_point
                            processing_point = False
                            x_start_point = False

                        old_y_point = None
                        break
        # sort square objects
        square_objects.sort(key=lambda t: t['left_top_point'][0])

        """
        detect all transparent space and paste by list fb-avatar
        """
        copy = img.copy()
        fb = []
        # check fb_list is a list or a single image
        if isinstance(fb_list, list):
            for item in fb_list:
                try:
                    fb.append({
                        'image': open_img_path(item),
                        'name': item['name']
                    })
                except ValueError as error:
                    raise Exception(error)
        else:
            fb.append({
                'image': open_img_path(fb_list)
            })

        for circle in square_objects:
            """
            get all facebook avatar from input and initial to image object
            """
            # TODO: always have a default fb-avatar
            if not fb:
                instance_fb = Image.open(default_fb_avatar)
                instance_name = None
            else:
                instance_fb = fb[0]['image']
                instance_name = fb[0]['name']
                fb.pop(0)

            if not instance_fb:
                instance_fb = Image.open(default_fb_avatar)

            instance_fb = instance_fb.resize((2 * circle['segment'] + 2, 2 * circle['segment'] + 2), Image.NEAREST)
            copy.paste(instance_fb, (circle['left_top_point'][0], circle['left_top_point'][1]))

            # find position to draw fb-user name
            if instance_name:
                text_position = (
                    circle['left_top_point'][0],
                    circle['left_top_point'][1] + 2 * circle['segment'] + 20,
                    circle['left_top_point'][0] + 2 * circle['segment'],
                    circle['left_top_point'][1] + 2 * circle['segment']
                )
                img = draw_image(image=img, t_center=True,
                        position=text_position, font_size=font_size,
                        color=font_color, save=False, text=instance_name)

        if write_text:
            img = draw_image(image=img, position=write_text['position'],
                font_size=write_text['font_size'], color=write_text['font_color'], save=False,
                text=write_text['content'])

        # case circle (need mask)
        if type_sharp == TYPE_CIRCLE:
            copy.paste(img, (0, 0), img)

        copy.save(os.path.join(MEDIA_PATH, filename_output), "JPEG", quality=80, optimize=True, progressive=True)
        return filename_output

    except ValueError as error:
        utils.print_exception()
        raise Exception(error)
