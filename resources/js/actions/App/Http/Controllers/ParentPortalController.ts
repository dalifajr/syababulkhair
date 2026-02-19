import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ParentPortalController::dashboard
 * @see app/Http/Controllers/ParentPortalController.php:37
 * @route '/parent'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/parent',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ParentPortalController::dashboard
 * @see app/Http/Controllers/ParentPortalController.php:37
 * @route '/parent'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ParentPortalController::dashboard
 * @see app/Http/Controllers/ParentPortalController.php:37
 * @route '/parent'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ParentPortalController::dashboard
 * @see app/Http/Controllers/ParentPortalController.php:37
 * @route '/parent'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ParentPortalController::dashboard
 * @see app/Http/Controllers/ParentPortalController.php:37
 * @route '/parent'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ParentPortalController::dashboard
 * @see app/Http/Controllers/ParentPortalController.php:37
 * @route '/parent'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ParentPortalController::dashboard
 * @see app/Http/Controllers/ParentPortalController.php:37
 * @route '/parent'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\ParentPortalController::scores
 * @see app/Http/Controllers/ParentPortalController.php:100
 * @route '/parent/scores'
 */
export const scores = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scores.url(options),
    method: 'get',
})

scores.definition = {
    methods: ["get","head"],
    url: '/parent/scores',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ParentPortalController::scores
 * @see app/Http/Controllers/ParentPortalController.php:100
 * @route '/parent/scores'
 */
scores.url = (options?: RouteQueryOptions) => {
    return scores.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ParentPortalController::scores
 * @see app/Http/Controllers/ParentPortalController.php:100
 * @route '/parent/scores'
 */
scores.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scores.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ParentPortalController::scores
 * @see app/Http/Controllers/ParentPortalController.php:100
 * @route '/parent/scores'
 */
scores.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: scores.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ParentPortalController::scores
 * @see app/Http/Controllers/ParentPortalController.php:100
 * @route '/parent/scores'
 */
    const scoresForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: scores.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ParentPortalController::scores
 * @see app/Http/Controllers/ParentPortalController.php:100
 * @route '/parent/scores'
 */
        scoresForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: scores.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ParentPortalController::scores
 * @see app/Http/Controllers/ParentPortalController.php:100
 * @route '/parent/scores'
 */
        scoresForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: scores.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    scores.form = scoresForm
/**
* @see \App\Http\Controllers\ParentPortalController::attendance
 * @see app/Http/Controllers/ParentPortalController.php:133
 * @route '/parent/attendance'
 */
export const attendance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(options),
    method: 'get',
})

attendance.definition = {
    methods: ["get","head"],
    url: '/parent/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ParentPortalController::attendance
 * @see app/Http/Controllers/ParentPortalController.php:133
 * @route '/parent/attendance'
 */
attendance.url = (options?: RouteQueryOptions) => {
    return attendance.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ParentPortalController::attendance
 * @see app/Http/Controllers/ParentPortalController.php:133
 * @route '/parent/attendance'
 */
attendance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ParentPortalController::attendance
 * @see app/Http/Controllers/ParentPortalController.php:133
 * @route '/parent/attendance'
 */
attendance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendance.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ParentPortalController::attendance
 * @see app/Http/Controllers/ParentPortalController.php:133
 * @route '/parent/attendance'
 */
    const attendanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendance.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ParentPortalController::attendance
 * @see app/Http/Controllers/ParentPortalController.php:133
 * @route '/parent/attendance'
 */
        attendanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendance.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ParentPortalController::attendance
 * @see app/Http/Controllers/ParentPortalController.php:133
 * @route '/parent/attendance'
 */
        attendanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendance.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    attendance.form = attendanceForm
/**
* @see \App\Http\Controllers\ParentPortalController::schedule
 * @see app/Http/Controllers/ParentPortalController.php:177
 * @route '/parent/schedule'
 */
export const schedule = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule.url(options),
    method: 'get',
})

schedule.definition = {
    methods: ["get","head"],
    url: '/parent/schedule',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ParentPortalController::schedule
 * @see app/Http/Controllers/ParentPortalController.php:177
 * @route '/parent/schedule'
 */
schedule.url = (options?: RouteQueryOptions) => {
    return schedule.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ParentPortalController::schedule
 * @see app/Http/Controllers/ParentPortalController.php:177
 * @route '/parent/schedule'
 */
schedule.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ParentPortalController::schedule
 * @see app/Http/Controllers/ParentPortalController.php:177
 * @route '/parent/schedule'
 */
schedule.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedule.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ParentPortalController::schedule
 * @see app/Http/Controllers/ParentPortalController.php:177
 * @route '/parent/schedule'
 */
    const scheduleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: schedule.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ParentPortalController::schedule
 * @see app/Http/Controllers/ParentPortalController.php:177
 * @route '/parent/schedule'
 */
        scheduleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedule.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ParentPortalController::schedule
 * @see app/Http/Controllers/ParentPortalController.php:177
 * @route '/parent/schedule'
 */
        scheduleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedule.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    schedule.form = scheduleForm
/**
* @see \App\Http\Controllers\ParentPortalController::reportCards
 * @see app/Http/Controllers/ParentPortalController.php:238
 * @route '/parent/report-cards'
 */
export const reportCards = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportCards.url(options),
    method: 'get',
})

reportCards.definition = {
    methods: ["get","head"],
    url: '/parent/report-cards',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ParentPortalController::reportCards
 * @see app/Http/Controllers/ParentPortalController.php:238
 * @route '/parent/report-cards'
 */
reportCards.url = (options?: RouteQueryOptions) => {
    return reportCards.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ParentPortalController::reportCards
 * @see app/Http/Controllers/ParentPortalController.php:238
 * @route '/parent/report-cards'
 */
reportCards.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportCards.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ParentPortalController::reportCards
 * @see app/Http/Controllers/ParentPortalController.php:238
 * @route '/parent/report-cards'
 */
reportCards.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reportCards.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ParentPortalController::reportCards
 * @see app/Http/Controllers/ParentPortalController.php:238
 * @route '/parent/report-cards'
 */
    const reportCardsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reportCards.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ParentPortalController::reportCards
 * @see app/Http/Controllers/ParentPortalController.php:238
 * @route '/parent/report-cards'
 */
        reportCardsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reportCards.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ParentPortalController::reportCards
 * @see app/Http/Controllers/ParentPortalController.php:238
 * @route '/parent/report-cards'
 */
        reportCardsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reportCards.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reportCards.form = reportCardsForm
/**
* @see \App\Http\Controllers\ParentPortalController::reportCardDetail
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
export const reportCardDetail = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportCardDetail.url(args, options),
    method: 'get',
})

reportCardDetail.definition = {
    methods: ["get","head"],
    url: '/parent/report-cards/{reportCard}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ParentPortalController::reportCardDetail
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
reportCardDetail.url = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reportCard: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reportCard: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reportCard: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reportCard: typeof args.reportCard === 'object'
                ? args.reportCard.id
                : args.reportCard,
                }

    return reportCardDetail.definition.url
            .replace('{reportCard}', parsedArgs.reportCard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ParentPortalController::reportCardDetail
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
reportCardDetail.get = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportCardDetail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ParentPortalController::reportCardDetail
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
reportCardDetail.head = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reportCardDetail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ParentPortalController::reportCardDetail
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
    const reportCardDetailForm = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reportCardDetail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ParentPortalController::reportCardDetail
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
        reportCardDetailForm.get = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reportCardDetail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ParentPortalController::reportCardDetail
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
        reportCardDetailForm.head = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reportCardDetail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reportCardDetail.form = reportCardDetailForm
/**
* @see \App\Http\Controllers\ParentPortalController::announcements
 * @see app/Http/Controllers/ParentPortalController.php:288
 * @route '/parent/announcements'
 */
export const announcements = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcements.url(options),
    method: 'get',
})

announcements.definition = {
    methods: ["get","head"],
    url: '/parent/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ParentPortalController::announcements
 * @see app/Http/Controllers/ParentPortalController.php:288
 * @route '/parent/announcements'
 */
announcements.url = (options?: RouteQueryOptions) => {
    return announcements.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ParentPortalController::announcements
 * @see app/Http/Controllers/ParentPortalController.php:288
 * @route '/parent/announcements'
 */
announcements.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcements.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ParentPortalController::announcements
 * @see app/Http/Controllers/ParentPortalController.php:288
 * @route '/parent/announcements'
 */
announcements.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: announcements.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ParentPortalController::announcements
 * @see app/Http/Controllers/ParentPortalController.php:288
 * @route '/parent/announcements'
 */
    const announcementsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: announcements.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ParentPortalController::announcements
 * @see app/Http/Controllers/ParentPortalController.php:288
 * @route '/parent/announcements'
 */
        announcementsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: announcements.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ParentPortalController::announcements
 * @see app/Http/Controllers/ParentPortalController.php:288
 * @route '/parent/announcements'
 */
        announcementsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: announcements.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    announcements.form = announcementsForm
/**
* @see \App\Http\Controllers\ParentPortalController::announcementDetail
 * @see app/Http/Controllers/ParentPortalController.php:304
 * @route '/parent/announcements/{announcement}'
 */
export const announcementDetail = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcementDetail.url(args, options),
    method: 'get',
})

announcementDetail.definition = {
    methods: ["get","head"],
    url: '/parent/announcements/{announcement}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ParentPortalController::announcementDetail
 * @see app/Http/Controllers/ParentPortalController.php:304
 * @route '/parent/announcements/{announcement}'
 */
announcementDetail.url = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { announcement: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: typeof args.announcement === 'object'
                ? args.announcement.id
                : args.announcement,
                }

    return announcementDetail.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ParentPortalController::announcementDetail
 * @see app/Http/Controllers/ParentPortalController.php:304
 * @route '/parent/announcements/{announcement}'
 */
announcementDetail.get = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcementDetail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ParentPortalController::announcementDetail
 * @see app/Http/Controllers/ParentPortalController.php:304
 * @route '/parent/announcements/{announcement}'
 */
announcementDetail.head = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: announcementDetail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ParentPortalController::announcementDetail
 * @see app/Http/Controllers/ParentPortalController.php:304
 * @route '/parent/announcements/{announcement}'
 */
    const announcementDetailForm = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: announcementDetail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ParentPortalController::announcementDetail
 * @see app/Http/Controllers/ParentPortalController.php:304
 * @route '/parent/announcements/{announcement}'
 */
        announcementDetailForm.get = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: announcementDetail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ParentPortalController::announcementDetail
 * @see app/Http/Controllers/ParentPortalController.php:304
 * @route '/parent/announcements/{announcement}'
 */
        announcementDetailForm.head = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: announcementDetail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    announcementDetail.form = announcementDetailForm
/**
* @see \App\Http\Controllers\ParentPortalController::extracurriculars
 * @see app/Http/Controllers/ParentPortalController.php:210
 * @route '/parent/extracurriculars'
 */
export const extracurriculars = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: extracurriculars.url(options),
    method: 'get',
})

extracurriculars.definition = {
    methods: ["get","head"],
    url: '/parent/extracurriculars',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ParentPortalController::extracurriculars
 * @see app/Http/Controllers/ParentPortalController.php:210
 * @route '/parent/extracurriculars'
 */
extracurriculars.url = (options?: RouteQueryOptions) => {
    return extracurriculars.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ParentPortalController::extracurriculars
 * @see app/Http/Controllers/ParentPortalController.php:210
 * @route '/parent/extracurriculars'
 */
extracurriculars.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: extracurriculars.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ParentPortalController::extracurriculars
 * @see app/Http/Controllers/ParentPortalController.php:210
 * @route '/parent/extracurriculars'
 */
extracurriculars.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: extracurriculars.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ParentPortalController::extracurriculars
 * @see app/Http/Controllers/ParentPortalController.php:210
 * @route '/parent/extracurriculars'
 */
    const extracurricularsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: extracurriculars.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ParentPortalController::extracurriculars
 * @see app/Http/Controllers/ParentPortalController.php:210
 * @route '/parent/extracurriculars'
 */
        extracurricularsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: extracurriculars.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ParentPortalController::extracurriculars
 * @see app/Http/Controllers/ParentPortalController.php:210
 * @route '/parent/extracurriculars'
 */
        extracurricularsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: extracurriculars.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    extracurriculars.form = extracurricularsForm
const ParentPortalController = { dashboard, scores, attendance, schedule, reportCards, reportCardDetail, announcements, announcementDetail, extracurriculars }

export default ParentPortalController