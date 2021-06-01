using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace PWD.Schedule.Localization
{
    public static class ScheduleLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(ScheduleConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(ScheduleLocalizationConfigurer).GetAssembly(),
                        "PWD.Schedule.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
