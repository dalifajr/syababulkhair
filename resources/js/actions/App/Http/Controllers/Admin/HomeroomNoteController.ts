import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::index
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:17
 * @route '/admin/homeroom-notes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/homeroom-notes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::index
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:17
 * @route '/admin/homeroom-notes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::index
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:17
 * @route '/admin/homeroom-notes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::index
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:17
 * @route '/admin/homeroom-notes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::index
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:17
 * @route '/admin/homeroom-notes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::index
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:17
 * @route '/admin/homeroom-notes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::index
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:17
 * @route '/admin/homeroom-notes'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::show
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:43
 * @route '/admin/homeroom-notes/{classGroup}'
 */
export const show = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/homeroom-notes/{classGroup}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::show
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:43
 * @route '/admin/homeroom-notes/{classGroup}'
 */
show.url = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { classGroup: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { classGroup: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    classGroup: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classGroup: typeof args.classGroup === 'object'
                ? args.classGroup.id
                : args.classGroup,
                }

    return show.definition.url
            .replace('{classGroup}', parsedArgs.classGroup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::show
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:43
 * @route '/admin/homeroom-notes/{classGroup}'
 */
show.get = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::show
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:43
 * @route '/admin/homeroom-notes/{classGroup}'
 */
show.head = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::show
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:43
 * @route '/admin/homeroom-notes/{classGroup}'
 */
    const showForm = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::show
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:43
 * @route '/admin/homeroom-notes/{classGroup}'
 */
        showForm.get = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::show
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:43
 * @route '/admin/homeroom-notes/{classGroup}'
 */
        showForm.head = (args: { classGroup: number | { id: number } } | [classGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::edit
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:68
 * @route '/admin/homeroom-notes/edit/{enrollment}'
 */
export const edit = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/homeroom-notes/edit/{enrollment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::edit
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:68
 * @route '/admin/homeroom-notes/edit/{enrollment}'
 */
edit.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return edit.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::edit
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:68
 * @route '/admin/homeroom-notes/edit/{enrollment}'
 */
edit.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::edit
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:68
 * @route '/admin/homeroom-notes/edit/{enrollment}'
 */
edit.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::edit
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:68
 * @route '/admin/homeroom-notes/edit/{enrollment}'
 */
    const editForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::edit
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:68
 * @route '/admin/homeroom-notes/edit/{enrollment}'
 */
        editForm.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::edit
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:68
 * @route '/admin/homeroom-notes/edit/{enrollment}'
 */
        editForm.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::update
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:82
 * @route '/admin/homeroom-notes/{enrollment}'
 */
export const update = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/homeroom-notes/{enrollment}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::update
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:82
 * @route '/admin/homeroom-notes/{enrollment}'
 */
update.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return update.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::update
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:82
 * @route '/admin/homeroom-notes/{enrollment}'
 */
update.put = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::update
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:82
 * @route '/admin/homeroom-notes/{enrollment}'
 */
    const updateForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\HomeroomNoteController::update
 * @see app/Http/Controllers/Admin/HomeroomNoteController.php:82
 * @route '/admin/homeroom-notes/{enrollment}'
 */
        updateForm.put = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const HomeroomNoteController = { index, show, edit, update }

export default HomeroomNoteController