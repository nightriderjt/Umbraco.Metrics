import type { UmbLocalizationDictionary } from "@umbraco-cms/backoffice/localization-api";

export default {
  // Dashboard
  "dashboard": {
    "metrics": "Μετρικές",
    "exportMetrics": "Εξαγωγή Μετρικών",
    "performanceMetrics": "Μετρικές Απόδοσης",
    "umbracoMetrics": "Μετρικές Umbraco",
    "activeRequests": "Ενεργές Αιτήσεις",
    "refresh": "Ανανέωση",
    "lastUpdated": "Τελευταία ενημέρωση",
    "loading": "Φόρτωση...",
    "noData": "Δεν υπάρχουν διαθέσιμα δεδομένα",
    "errorLoading": "Σφάλμα φόρτωσης δεδομένων",
    "applicationPerformanceMetrics": "Μετρικές Απόδοσης Εφαρμογής",
    "dotnetApplication": "Εφαρμογή .NET",
    "realTimeMetrics": "Μετρικές σε Πραγματικό Χρόνο",
    "refreshMetrics": "Ανανέωση Μετρικών",
    "realTimeUpdates": "Ενημερώσεις σε Πραγματικό Χρόνο (SignalR)",
    "connected": "Συνδεδεμένο",
    "connecting": "Σύνδεση...",
    "overview": "Επισκόπηση",
    "heapAndGC": "Σωρός & GC",
    "utils": "Βοηθητικά",
    "clickToLoadPerformance": "Κάντε κλικ στο \"Ανανέωση Μετρικών\" για φόρτωση δεδομένων απόδοσης εφαρμογής",
    "clickToLoadHeap": "Κάντε κλικ στο \"Ανανέωση Μετρικών\" για φόρτωση πληροφοριών σωρού",
    "clickToLoadUmbraco": "Κάντε κλικ στο \"Ανανέωση Μετρικών\" για φόρτωση δεδομένων Umbraco",
    "utilityTools": "Βοηθητικά Εργαλεία",
    "utilityToolsDescription": "Πρόσθετα εργαλεία για διαχείριση και εξαγωγή δεδομένων μετρικών",
    "exportMetricsCard": "Εξαγωγή Μετρικών",
    "exportMetricsDescription": "Εξαγωγή μετρικών απόδοσης και Umbraco σε διάφορες μορφές (CSV, JSON)",
    "openExportDialog": "Άνοιγμα Διαλόγου Εξαγωγής",
    "dataManagement": "Διαχείριση Δεδομένων",
    "dataManagementDescription": "Διαχείριση ιστορικών δεδομένων μετρικών και επιλογών καθαρισμού",
    "cleanupOldData": "Καθαρισμός Παλαιών Δεδομένων",
    "advancedAnalytics": "Προχωρημένη Ανάλυση",
    "advancedAnalyticsDescription": "Δημιουργία λεπτομερών αναφορών και αναλύσεων από συλλεγμένα δεδομένα",
    "generateReport": "Δημιουργία Αναφοράς",
    "scheduledTasks": "Προγραμματισμένες Εργασίες",
    "scheduledTasksDescription": "Προγραμματισμός αυτόματων εξαγωγών και εργασιών συλλογής δεδομένων",
    "scheduleExport": "Προγραμματισμός Εξαγωγής"
  },

  // Export Modal
  "export": {
    "title": "Εξαγωγή Μετρικών",
    "quickExport": "Γρήγορη Εξαγωγή",
    "quickExportDescription": "Εξαγωγή όλων των μετρικών με ένα κλικ",
    "customExport": "Προσαρμοσμένη Εξαγωγή",
    "customExportDescription": "Διαμόρφωση επιλογών εξαγωγής",
    "exportAsCsv": "Εξαγωγή ως CSV",
    "exportAsJson": "Εξαγωγή ως JSON",
    "exportMetrics": "Εξαγωγή Μετρικών",
    "cancel": "Ακύρωση",
    "exporting": "Εξαγωγή...",
    "exportComplete": "Εξαγωγή Ολοκληρώθηκε",
    "exportFailed": "Αποτυχία Εξαγωγής",
    "metricsExportedSuccessfully": "Οι μετρικές εξήχθησαν επιτυχώς",
    "failedToExportMetrics": "Αποτυχία εξαγωγής μετρικών",
    "estimatedFileSize": "Εκτιμώμενο μέγεθος αρχείου"
  },

  // Export Options
  "exportOptions": {
    "format": "Μορφή",
    "scope": "Εύρος",
    "dateRange": "Εύρος Ημερομηνιών",
    "timezone": "Ζώνη Ώρας",
    "includeMetrics": "Συμπερίληψη Μετρικών",
    "performanceMetrics": "Μετρικές Απόδοσης",
    "umbracoMetrics": "Μετρικές Umbraco",
    "activeRequests": "Ενεργές Αιτήσεις",
    "startDate": "Ημερομηνία Έναρξης",
    "endDate": "Ημερομηνία Λήξης",
    "to": "έως",
    "currentSnapshot": "Τρέχουσα Στιγμιότυπο",
    "historicalData": "Ιστορικά Δεδομένα",
    "customRange": "Προσαρμοσμένο Εύρος",
    "exportCurrentMetricsOnly": "Εξαγωγή μόνο τρεχουσών μετρικών",
    "exportHistoricalMetrics": "Εξαγωγή ιστορικών μετρικών",
    "exportMetricsFromSpecificDateRange": "Εξαγωγή μετρικών από συγκεκριμένο εύρος ημερομηνιών"
  },

  // Format Options
  "formats": {
    "json": "JSON",
    "csv": "CSV",
    "xml": "XML",
    "jsonDescription": "Δομημένη μορφή δεδομένων, κατάλληλη για APIs και προγραμματισμό",
    "csvDescription": "Μορφή υπολογιστικού φύλλου, κατάλληλη για Excel και ανάλυση δεδομένων",
    "xmlDescription": "Μορφή σήμανσης, κατάλληλη για παλιά συστήματα"
  },

  // Timezone Options
  "timezones": {
    "utc": "UTC",
    "local": "Τοπική Ώρα",
    "europeLondon": "Ευρώπη/Λονδίνο",
    "americaNewYork": "Αμερική/Νέα Υόρκη",
    "asiaTokyo": "Ασία/Τόκιο"
  },

  // Validation Messages
  "validation": {
    "bothDatesRequired": "Απαιτούνται και οι δύο ημερομηνίες για προσαρμοσμένο εύρος",
    "startDateBeforeEndDate": "Η ημερομηνία έναρξης πρέπει να είναι πριν από την ημερομηνία λήξης",
    "atLeastOneMetricRequired": "Πρέπει να επιλεγεί τουλάχιστον ένας τύπος μετρικής",
    "invalidExportConfiguration": "Μη έγκυρη διαμόρφωση εξαγωγής"
  },

  // Progress
  "progress": {
    "preparing": "Προετοιμασία εξαγωγής...",
    "exporting": "Εξαγωγή δεδομένων...",
    "downloading": "Λήψη αρχείου...",
    "complete": "Εξαγωγή ολοκληρώθηκε"
  },

  // Metric Cards
  "metrics": {
    "cpuUsage": "Χρήση CPU",
    "memoryUsage": "Χρήση Μνήμης",
    "totalRequests": "Συνολικές Αιτήσεις",
    "activeRequests": "Ενεργές Αιτήσεις",
    "totalContentNodes": "Συνολικοί Κόμβοι Περιεχομένου",
    "totalMediaItems": "Συνολικά Αντικείμενα Πολυμέσων",
    "runtimeCacheItems": "Αντικείμενα Cache Εκτέλεσης",
    "totalUsers": "Συνολικοί Χρήστες",
    "processId": "ID Διεργασίας",
    "uptime": "Χρόνος Λειτουργίας",
    "threadCount": "Αριθμός Νημάτων",
    "publishedNodes": "Δημοσιευμένοι Κόμβοι",
    "totalCacheSize": "Συνολικό Μέγεθος Cache",
    "activeUsers": "Ενεργοί Χρήστες"
  },

  // Units
  "units": {
    "percent": "%",
    "megabytes": "MB",
    "requests": "αιτήσεις",
    "nodes": "κόμβοι",
    "items": "αντικείμενα",
    "users": "χρήστες",
    "seconds": "δευτερόλεπτα",
    "minutes": "λεπτά",
    "hours": "ώρες",
    "days": "ημέρες"
  },

  // Active Requests Sidebar
  "activeRequests": {
    "title": "Ενεργές Αιτήσεις",
    "loading": "Φόρτωση ενεργών αιτήσεων...",
    "noRequests": "Δεν υπάρχουν ενεργές αιτήσεις",
    "allRequestsCompleted": "Όλες οι αιτήσεις έχουν ολοκληρωθεί",
    "activeRequestsCount": "ενεργή αίτηση",
    "activeRequestsCount_plural": "ενεργές αιτήσεις",
    "method": "Μέθοδος",
    "path": "Διαδρομή",
    "duration": "Διάρκεια",
    "startTime": "Ώρα Έναρξης",
    "queryString": "Συμβολοσειρά Ερωτήματος",
    "remoteIp": "Απομακρυσμένη IP",
    "userAgent": "Πράκτορας Χρήστη",
    "autoRefresh": "Αυτόματη ανανέωση",
    "refresh": "Ανανέωση",
    "close": "Κλείσιμο",
    "milliseconds": "ms",
    "seconds": "s",
    "minutes": "λεπ",
    "get": "GET",
    "post": "POST",
    "put": "PUT",
    "delete": "DELETE"
  },

  // Common
  "common": {
    "yes": "Ναι",
    "no": "Όχι",
    "enabled": "Ενεργοποιημένο",
    "disabled": "Απενεργοποιημένο",
    "loading": "Φόρτωση...",
    "saving": "Αποθήκευση...",
    "error": "Σφάλμα",
    "success": "Επιτυχία",
    "warning": "Προειδοποίηση",
    "info": "Πληροφορία",
    "close": "Κλείσιμο",
    "save": "Αποθήκευση",
    "delete": "Διαγραφή",
    "edit": "Επεξεργασία",
    "view": "Προβολή",
    "add": "Προσθήκη",
    "remove": "Αφαίρεση",
    "search": "Αναζήτηση",
    "filter": "Φίλτρο",
    "sort": "Ταξινόμηση",
    "refresh": "Ανανέωση",
    "download": "Λήψη",
    "upload": "Μεταφόρτωση",
    "export": "Εξαγωγή",
    "import": "Εισαγωγή",
    "settings": "Ρυθμίσεις",
    "help": "Βοήθεια",
    "about": "Σχετικά"
  }
} as UmbLocalizationDictionary;