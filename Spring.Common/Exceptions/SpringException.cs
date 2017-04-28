using System;

namespace Spring.Common.Exceptions
{
    public class SpringException : Exception
    {
        public SpringException()
        { }

        public SpringException(string message)
            : base(message)
        { }

        public SpringException(string message, Exception innerException)
            : base(message, innerException)
        { }
    }
}